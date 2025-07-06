import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
`;

const Spinner = styled.svg`
  width: 2rem;
  animation: ${spin} 1s linear infinite;
`;

const Circle = styled.circle`
  stroke: #e5e7eb;
`;

const Path = styled.path`
  stroke: #3b82f6;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spinner
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-live='polite'
        aria-busy='true'
        aria-labelledby='title-05a desc-05a'>
        <title id='title-05a'>Loading...</title>
        <desc id='desc-05a'>Animated loading spinner</desc>
        <Circle cx='12' cy='12' r='10' strokeWidth='4' />
        <Path
          d='M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2'
          strokeWidth='4'
        />
      </Spinner>
    </LoadingWrapper>
  );
};

export default Loading;
