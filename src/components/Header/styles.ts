import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 390px) {
    img {
      width: 110px;
      height: 28px;
      flex-shrink: 0;
    }
  }
`;

export const NewTransactionButton = styled.button`
  height: 3.125rem;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s;
  }

  @media (max-width: 390px) {
    width: 8.2rem;
    height: 2.2rem;
    padding: 0;
    color: ${(props) => props.theme.white};
    font-size: 0.88rem;
    font-weight: 500;
  }
`;
