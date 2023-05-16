import styled from 'styled-components';

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  z-index: 98;
  width: 100%;
  height: 100vh;


  display: grid;
  place-items: center;
  position: absolute;
  background-color: var(--black-secondary);
`;

export const Container = styled.div`
  width: min(620px, 100%);
  height: min(280px, 100%);

  background: var(--white);
  border-radius: 8px;
  padding: 48px 32px;
  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
