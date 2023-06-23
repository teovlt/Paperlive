import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Placeholder = styled.span`
  color: var(--black-tertiary);
  font-size: 1.5rem;
`;

export const Toggler = styled.div`
  border: 1px solid var(--black-quaternary);
  padding: 0.9rem 3.6rem 0.9rem 1.6rem;
  border-radius: 0.2rem;

  cursor: pointer;
  user-select: none;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &.filled ${Placeholder} {
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;

    position: absolute;
    top: 0;
    left: 1.2rem;
    transform: translateY(-50%);

    font-size: 1.2rem;
    line-height: 1.2rem;

    background: var(--white);
  }

  &::after {
    content: '▶︎';
    font-size: 1rem;
    color: var(--black);

    position: absolute;
    top: 50%;
    right: 1.6rem;
    transform: translateY(-50%) rotate(90deg);
  }

  &.open {
    border-bottom-width: 0.05rem;
    border-radius: 0.2rem 0.2rem 0 0;

    &::after {
      color: var(--accent);
      transform: translateY(-50%) rotate(-90deg);
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.6rem;
`;

export const Counter = styled.span`
  font-size: 1.5rem;
  color: var(--white);
  background: var(--black);

  border-radius: 0.4rem;
  padding: 0.275rem 1rem;
`;

export const ButtonCircle = styled.button`
  display: flex;
  padding: 0.375rem;

  z-index: 99;

  &:hover {
    cursor: pointer;
    border-radius: 100px;
    background: var(--black-quaternary);
  }
`;

export const Search = styled.input`
  color: var(--black);
  padding: 1.2rem 1.6rem;
  font-size: 1.5rem;

  border-block: 0.05rem solid var(--black-quaternary);
  border-inline: 0.1rem solid var(--black-quaternary);

  &::placeholder {
    user-select: none;
    color: var(--black-tertiary);
  }
`;

export const SelectedItemsContainer = styled.div`
  border-block: 0.05rem solid var(--black-quaternary);
  border-inline: 0.1rem solid var(--black-quaternary);

  &:last-child {
    border-bottom-width: 0.1rem;
    border-radius: 0 0 0.2rem 0.2rem;
  }

  display: flex;
  flex-direction: column;
`;

export const DisplayedListContainer = styled.div`
  border-block: 0.05rem solid var(--black-quaternary);
  border-inline: 0.1rem solid var(--black-quaternary);

  &:last-child {
    border-bottom-width: 0.1rem;
    border-radius: 0 0 0.2rem 0.2rem;
  }

  display: flex;
  flex-direction: column;
`;

export const ResultsButton = styled.button`
  user-select: none;

  text-align: left;
  font-size: 1.5rem;
  color: var(--black-tertiary);
  padding: 0.625rem 1.6rem;

  &:hover {
    cursor: pointer;
    background: var(--black-quaternary);
  }
`;

export const PillContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  column-gap: 0.8rem;
  overflow: hidden;
`;

export const Pill = styled.div`
  flex: 0 0 auto;
  max-width: calc(25% - 1.2rem);

  display: inline-flex;
  align-items: center;
  column-gap: 1.2rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-radius: 0.2rem;
  padding-block: 0.175rem;
  padding-inline: 0.8rem 1.2rem;
  background: var(--accent-vibrant);
  border: 0.1rem solid var(--accent-vibrant);
`;

export const PillLabel = styled.span`
  color: var(--black-secondary);
  font-size: 1.5rem;

  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PillButton = styled.button`
  display: flex;
  color: var(--black-secondary);

  &:hover {
    cursor: pointer;
    background: var(--black-quaternary);
    border-radius: 100px;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: block;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 99;

  cursor: default;
  background: var(--black-tertiary);
`;

export const ModalContainer = styled.div`
  position: fixed;
  display: block;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  width: min(47rem, 80%);
  padding: 4.8rem 2.4rem;

  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;

  background: white;
`;

export const ModalRowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1.6rem;
`;
