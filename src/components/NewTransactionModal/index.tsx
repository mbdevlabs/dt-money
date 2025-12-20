import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as z from 'zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

interface NewTransactionModalProps {
  onClose: () => void;
}

export function NewTransactionModal({ onClose }: NewTransactionModalProps) {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    },
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    try {
      const { description, price, category, type } = data;

      await createTransaction({
        description,
        price,
        category,
        type,
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  }

  return (
    <>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register('description')}
            />
            <input
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                );
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </>
  );
}
