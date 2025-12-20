import { ReactNode, useEffect, useState, useCallback } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

const STORAGE_KEY = '@dt-money:transactions';

type Transaction = {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
};

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface FetchAllTransactionsProps {
  query?: string;
  page?: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  allTransactions: Transaction[];
  limitPerPage: number;

  fetchTransactions: ({
    query,
    page,
  }: FetchAllTransactionsProps) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransationsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

const limitPerPage = 4;

// Funções auxiliares para localStorage
function loadFromStorage(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return [];
  }
}

function saveToStorage(transactions: Transaction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

function getNextId(transactions: Transaction[]): number {
  if (transactions.length === 0) return 1;
  return Math.max(...transactions.map((t) => t.id)) + 1;
}

export function TransactionProvider({ children }: TransationsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(() => {
    // Carrega do localStorage na inicialização
    return loadFromStorage();
  });

  const fetchTransactions = useCallback(
    async ({ page = 1, query }: FetchAllTransactionsProps) => {
      try {
        const response = await api.get('/transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query,
            _page: page,
            _limit: limitPerPage,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        // Fallback para localStorage se API falhar
        const storedTransactions = loadFromStorage();
        let filtered = storedTransactions;

        // Aplica filtro de busca se houver
        if (query) {
          filtered = storedTransactions.filter((transaction) =>
            transaction.description.toLowerCase().includes(query.toLowerCase()),
          );
        }

        // Ordena por data (mais recente primeiro)
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        // Aplica paginação
        const startIndex = (page - 1) * limitPerPage;
        const endIndex = startIndex + limitPerPage;
        const paginated = filtered.slice(startIndex, endIndex);

        setTransactions(paginated);
      }
    },
    [],
  );

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
        },
      });
      setAllTransactions(response.data);
      // Sincroniza com localStorage
      saveToStorage(response.data);
    } catch (error) {
      // Fallback para localStorage se API falhar
      const storedTransactions = loadFromStorage();
      setAllTransactions(storedTransactions);
    }
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const newTransaction: Transaction = {
        id: getNextId(allTransactions),
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(),
      };

      try {
        // Tenta criar na API
        const response = await api.post('/transactions', {
          description,
          price,
          category,
          type,
          createdAt: newTransaction.createdAt,
        });

        // Se sucesso, usa o retorno da API
        const createdTransaction = response.data;
        setTransactions((state) => [createdTransaction, ...state]);
        setAllTransactions((state) => {
          const updated = [createdTransaction, ...state];
          saveToStorage(updated);
          return updated;
        });
      } catch (error) {
        // Fallback para localStorage se API falhar
        console.log('API indisponível, salvando apenas no localStorage');

        setTransactions((state) => [newTransaction, ...state]);
        setAllTransactions((state) => {
          const updated = [newTransaction, ...state];
          saveToStorage(updated);
          return updated;
        });
      }
    },
    [allTransactions],
  );

  useEffect(() => {
    fetchTransactions({});
  }, [fetchTransactions]);

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        allTransactions,
        limitPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
