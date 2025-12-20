import { ThemeProvider } from 'styled-components';
import { Transactions } from './pages/Transactions';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

import { TransactionProvider } from './contexts/TransactionsContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    </ThemeProvider>
  );
}
