import styled, { css } from 'styled-components';

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`;

interface SummaryCardProps {
  variant?: 'green';
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-500']};
    `}

  span:last-child {
    display: none;
  }

  @media (max-width: 390px) {
    width: 260px;
    height: 140px;
    padding: 1.5rem 1.5rem 0 1.5rem;

    span:last-child {
      font-size: 0.82rem;
      display: block;
      color: ${(props) => props.theme['gray-500']};
    }

    &:nth-of-type(3) span:last-child {
      color: ${(props) => props.theme['gray-300']};
    }

    strong {
      font-size: 1.5rem;
      margin-top: 16px;
      margin-bottom: 6px;
    }
  }
`;
