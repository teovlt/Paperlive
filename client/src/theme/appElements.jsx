import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: min(1120px, 80%);
  margin-inline: auto;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

export const Button = styled.button`
  user-select: none;
  cursor: pointer;

  display: inline-block;
  padding: ${(props) => (props.secondary ? '0.5rem 1.6rem' : '1.2rem 1.6rem')};
  border: ${(props) => {
    if (props.secondary) {
      switch (props.type) {
        case 'positive':
          return '1px solid var(--positive-vibrant)';
        case 'notice':
          return '1px solid var(--notice-vibrant)';
        case 'negative':
          return '1px solid var(--negative-vibrant)';
        default:
          return '1px solid var(--black-quaternary)';
      }
    }
  }};
  text-align: center;
  border-radius: 2px;

  font-size: ${(props) => (props.secondary ? '1.5rem' : '1.6rem')};
  line-height: 1.6rem;
  text-decoration: none;

  color: ${(props) =>
    props.secondary || props.type === 'neutral' ? 'var(--black)' : 'var(--white)'};
  background-color: ${(props) => {
    if (props.secondary) {
      switch (props.type) {
        case 'positive':
          return 'var(--positive-vibrant)';
        case 'notice':
          return 'var(--notice-vibrant)';
        case 'negative':
          return 'var(--negative-vibrant)';
        default:
          return 'var(--black-quaternary)';
      }
    } else {
      switch (props.type) {
        case 'positive':
          return 'var(--positive)';
        case 'notice':
          return 'var(--notice)';
        case 'negative':
          return 'var(--negative)';
        case 'neutral':
          return 'var(--black-quaternary)';
        default:
          return 'var(--accent)';
      }
    }
  }};
`;

export const Heading1 = styled.h1`
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 3.6rem;

  color: var(--black);
`;

export const Heading2 = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;
  color: var(--accent);
`;

export const Heading3 = styled.h3`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2rem;
  color: var(--black);
`;

export const Paragraph = styled.p`
  color: var(--black-secondary);
  text-align: justify;
`;

export const Caption = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8rem;

  color: var(--black);
`;

export const Label = styled.p`
  font-size: 1.5rem;

  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--black-tertiary);

  span {
    color: var(--black);
  }
`;

export const Small = styled.small`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;

  color: var(--black);
`;

export const Link = styled(NavLink)`
  font-size: inherit;
  color: var(--accent);
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const IconLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;

  column-gap: 6px;
  color: var(--black);

  &:hover {
    text-decoration: underline;
    color: var(--accent);
  }
`;

export const DivTop = styled.div`
  border-bottom: 1px solid var(--black-quaternary);
  position: absolute;
  width: 100%;
  height: 56px;
  z-index: -1;
`;

export const HorizontalDivider = styled.span`
  height: 1px;
  width: 100%;
  background: var(--black-quaternary);
`;

export const VerticalDivider = styled.span`
  height: 100%;
  width: 1px;
  background: var(--black-quaternary);
`;

export const InlineGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
