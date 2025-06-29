import styled from 'styled-components';
import { LoadingContainer, Spinner } from './loadingElements';
import { FaGithub } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
  text-align: center;
  padding: 0 1rem;
  position: relative;
`;

const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 48rem;
`;

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 1rem;
  font-size: 2rem;

  a {
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.2s;
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <Content>
        <Title>⏳ Hold tight, deploying some coolness...</Title>
        <span>
          This app runs on a free plan — it might nap a bit before waking up. Meanwhile, you can
          flex your support by starring our stuff:
        </span>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            width: '100%',
            justifyContent: 'center',
          }}>
          <GithubLink href='https://github.com/teovlt' target='_blank' rel='noopener noreferrer'>
            <FaGithub size={20} />
            Star Téo on GitHub
          </GithubLink>

          <GithubLink
            href='https://github.com/gabrielhalus'
            target='_blank'
            rel='noopener noreferrer'>
            <FaGithub size={20} />
            Star Gabriel on GitHub
          </GithubLink>
        </div>
      </Content>

      <LoadingContainer>
        <Spinner />
      </LoadingContainer>

      <Footer>
        Built with ❤️ by{' '}
        <a href='https://teovillet.fr' target='_blank' rel='noopener noreferrer'>
          Téo Villet
        </a>{' '}
        &{' '}
        <a href='https://github.com/gabrielhalus' target='_blank' rel='noopener noreferrer'>
          Gabriel Halus
        </a>
      </Footer>
    </Wrapper>
  );
};

export default Loading;
