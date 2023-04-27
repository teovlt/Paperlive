import styled from 'styled-components';

export const ContainerDropDown = styled.div`
  background-color: white;
  color: black;
  border-radius: 8px;
  position: absolute;
  margin-top: 30px;
  border: 1px solid var(--black-quaternary);
  width: max-content;
`;

export const DivSignedAs = styled.div`
  border-bottom: 1px solid var(--black-quaternary);
  padding-inline: 14px;
  padding-block: 10px;
`;

export const DivActions = styled.div`
  &:hover {
    cursor: pointer;
    p:hover {
      background-color: var(--accent);
      color: var(--white);
    }
  }
  p {
    padding-inline: 14px;
    padding-block: 10px;
  }
`;
