import styled, { keyframes } from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  height: 120px;
  width: 120px;
  border: 6px solid;
  border-color: var(--accent) transparent;
  border-radius: 50%;
  animation: ${spin} 1.3s ease infinite;
`;
