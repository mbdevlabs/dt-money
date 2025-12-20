import styled from 'styled-components';

export const PageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  flex: 1;

  @media (max-width: 390px) {
    margin: 1.5rem auto 0;
    div:first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;

      span:first-child {
        color: ${(props) => props.theme['gray-300']};
        font-weight: 400;
        line-height: 160%;
      }

      span:last-child {
        color: ${(props) => props.theme['gray-500']};
        font-weight: 400;
        font-size: 1rem;
        line-height: 160%;
      }
    }
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  div {
    display: flex;
    justify-content: space-between;
    /* padding: 0rem 2rem; */
    background: ${(props) => props.theme['gray-700']};
  }

  @media (max-width: 390px) {
    margin-top: 0.1rem;

    td {
      padding: 0.4rem 1.5rem;
    }

    tr {
      display: flex;
      flex-direction: column;
      padding: 0 0 0.75rem;
      margin-top: 0;
    }

    tr > td:first-child {
      padding: 1.2rem 0 0.2rem 1.5rem;
      font-size: 0.9rem;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: ${(props) => props.theme['gray-300']};
    }

    div {
      color: ${(props) => props.theme['gray-500']};
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    div > td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      height: 3.3rem;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      gap: 5px;
    }
  }
`;
interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};

  @media (max-width: 390px) {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;
