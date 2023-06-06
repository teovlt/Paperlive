import styled from 'styled-components';
import { Link as AppLink } from '../../theme/appElements';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

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
