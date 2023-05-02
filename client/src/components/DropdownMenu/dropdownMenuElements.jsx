import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownToggle = styled.button`
  color: inherit;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    position: absolute;
    content: '▶︎';

    right: -8px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);

    font-size: 0.6rem;
    color: inherit;
  }
`;

export const Dropdown = styled.div`
  min-width: 200px;

  position: absolute;
  top: ${(props) => `${props.gap}px`};
  z-index: 9999;

  transform: translateX(-50%);

  border-radius: 4px;
  border: 1px solid var(--black-quaternary);

  user-select: none;
`;

export const MenuGroup = styled.div`
  padding-block: 4px;
  font-size: 1.4rem;

  span {
    font-weight: 600;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--black-quaternary);
  }
`;

export const MenuLabel = styled.p`
  width: 100%;
  padding: 4px 8px 4px 16px;
  color: var(--black);
`;

export const MenuButton = styled.button`
  cursor: pointer;

  width: 100%;
  padding: 4px 8px 4px 16px;

  color: var(--black);
  font-size: 1.4rem;
  text-align: start;

  &:hover {
    color: var(--white);
    background: var(--accent);
  }
`;
