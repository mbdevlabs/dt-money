import { useState } from 'react';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

import logoImg from '../../assets/logo-dt-money.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from '../NewTransactionModal';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal onClose={() => setOpen(false)} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
