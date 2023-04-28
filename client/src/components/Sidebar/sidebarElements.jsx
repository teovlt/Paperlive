import styled from 'styled-components';

export const Container = styled.div`
  grid-area: 1 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  padding-block: 32px;
  gap: 16px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: ${(props) => !props.inline && 'column'};
  gap: ${(props) => (props.inline ? '8px' : '4px')};
`;

export const IconLabel = styled.span`
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--black-tertiary);

  span {
    color: var(--black);
  }
`;
