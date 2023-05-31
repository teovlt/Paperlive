import styled from 'styled-components';

export const Container = styled.div`
  /* border-collapse: collapse; */
  width: 100%;

  font-size: 1.5rem;
  user-select: none;
  color: var(--black);
`;

// Header
export const THeader = styled.div`
  display: flex;
  border-bottom: 0.1rem solid var(--black-quaternary);
  margin-bottom: 1.2rem;
`;

export const Search = styled.input`
  flex: 1;

  margin-bottom: 0.6rem;
  padding: 0.8rem;
  font-size: 1.5rem;
  color: var(--black);

  &::placeholder {
    color: var(--black-tertiary);
  }
`;

export const Button = styled.button`
  cursor: pointer;

  margin-bottom: 0.6rem;
  padding-inline: 1.2rem;
  border-radius: 0.4rem;

  background: var(--accent);
  color: var(--white);
  font-size: 1.5rem;

  &::after {
    margin-left: 0.4rem;
    content: '+';
  }
`;

// Head
export const THead = styled.div`
  display: flex;
`;

export const Attr = styled.div`
  cursor: pointer;

  flex: 1;
  position: relative;

  padding: 0.8rem;
  margin-right: 0.1rem;
  color: var(--black-tertiary);

  svg {
    font-size: 1.5rem;
    margin-right: 8px;
    vertical-align: middle;
  }

  &:first-child {
    flex: 2;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: rgba(34, 34, 34, 0.08);
  }

  &.active::after {
    content: '▶︎';
    font-size: 0.8rem;

    position: absolute;
    top: 50%;
    margin-left: 4px;
    transform: translateY(-50%) rotate(-90deg);

    color: var(--accent);
  }

  &.active.sortDesc::after {
    transform: translateY(-50%) rotate(90deg);
  }
`;

// Body
export const TBody = styled.div`
  display: flex;
  flex-direction: column;

  border-collapse: collapse;
`;

export const DataRow = styled.div`
  cursor: pointer;

  display: flex;

  border-collapse: collapse;
  border-block: 0.05rem solid var(--black-quaternary);

  &:hover {
    background: rgba(34, 34, 34, 0.08);
  }

  &:first-child {
    border-top-width: 0.1rem;
  }

  &:last-child {
    border-bottom-width: 0.1rem;
  }
`;

export const DataCell = styled.div`
  flex: 1;
  position: relative;

  padding: 0.8rem;
  color: var(--black);

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  border-inline: 0.05rem solid var(--black-quaternary);

  &:first-child {
    flex: 2;
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }
`;

export const BodyButton = styled.button`
  flex: 1;

  cursor: pointer;

  font-size: 1.5rem;
  text-align: start;

  padding: 0.8rem;
  color: var(--black-tertiary);

  &::after {
    content: '+';
    margin-left: 0.4rem;
  }
`;

// Footer
export const TFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const Label = styled.div`
  padding: 0.8rem;
  flex: 1;

  color: var(--black-tertiary);
  text-align: end;

  &:last-child {
    flex: 2;
  }
`;

export const Value = styled.span`
  color: var(--black);
`;
