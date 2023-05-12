import styled from 'styled-components';

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;

  background: var(--black-tertiary);

  display: grid;
  place-items: center;
`;


export const Container = styled.div`
  width: min(620px, 100%);
  height: min(280px, 100%);

  background: var(--white);
  border-radius: 8px;
  padding: 48px 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Title = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: var(--black);
  margin-bottom: 8px;
`;
export const Caption = styled.p`
  font-size: 1.6rem;
  color: var(--black-secondary);

`;

export const ActionsContainer = styled.div`
  margin-top: auto;

  display: inline-flex;
  justify-content: flex-end;
  gap: 8px;
`;
