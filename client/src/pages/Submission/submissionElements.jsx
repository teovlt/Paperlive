import styled from 'styled-components';
import { Link as AppLink } from '../../theme/appElements';

export const LineWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding-bottom: 8px;
  height: 35px;

  display: flex;
  justify-content: space-between;

  /* overflow-x: hidden; */

  font-size: 1.5rem;
  border-bottom: 1px solid var(--black-quaternary);
  align-items: center;
`;

export const Label = styled.span`
  user-select: none;
  color: var(--black-tertiary);
  margin-right: 3.2rem;

  white-space: nowrap;
`;

export const Value = styled.span`
  text-align: right;
  color: var(--black);

  overflow: hidden;
  text-overflow: ellipsis;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Link = styled(AppLink)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: ${(props) => !props.inline && 'column'};
  gap: ${(props) => (props.inline ? '8px' : '4px')};
  width: 100%;
`;

export const LinkModal = styled(Value)`
  color: var(--accent);
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: var(--white);
  padding: 50px;
`;

export const BackModal = styled.div`
  z-index: 9;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100%;
  background-color: var(--black-secondary);
`;
