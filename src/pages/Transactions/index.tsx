import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PageContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import {
  dateFormatter,
  priceFormatter,
  screenDisplay,
} from '../../utils/formatter';
import { CalendarBlank, TagSimple } from 'phosphor-react';
import { useContextSelector } from 'use-context-selector';
import { Pagination } from '../../components/Pagination';

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <PageContainer>
      <Header />
      <Summary />
      <TransactionsContainer>
        {screenDisplay ? (
          <div>
            <span>Transações</span>
            <span>4 itens</span>
          </div>
        ) : (
          ''
        )}

        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <div>
                    <td>
                      {screenDisplay ? <TagSimple size={16} /> : ''}
                      {transaction.category}
                    </td>
                    <td>
                      {screenDisplay ? <CalendarBlank size={16} /> : ''}
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
      <Pagination />
    </PageContainer>
  );
}
