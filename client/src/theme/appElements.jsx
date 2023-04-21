import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: min(1120px, 80%);
  margin-inline: auto;
`;

export const Button = styled.button`
  user-select: none;
  cursor: pointer;

  display: inline-block;
  padding: 1.2rem 1.6rem;
  text-align: center;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.6rem;
  text-decoration: none;

  color: var(--white);
  background-color: var(--accent);
  /* TODO: Secondary, Positive, Notice, Destructive */
  /* background-color: ${(props) => props.secondary && '...'} */
`;
