import styled from 'styled-components';
const neutral = 'var(--black-quaternary)';

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;

  color: var(--black);
  font-size: 1.5rem;

  svg {
    font-size: 2rem;
    min-width: 16px;
    color: ${(props) => (props.type === 'neutral' ? 'var(--black)' : `var(--${props.type})`)};
  }

  outline-offset: -1px;
  outline: 1px solid
    ${(props) => (props.type === 'neutral' ? neutral : `var(--${props.type}-vibrant)`)};
  background: ${(props) => (props.type === 'neutral' ? neutral : `var(--${props.type}-vibrant)`)};
`;
