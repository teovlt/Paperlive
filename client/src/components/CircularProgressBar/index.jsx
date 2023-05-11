import React, { useState } from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.div`
  section {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    &::after {
      content: ${(props) => `"${props.fillPercentage}%"`};
      color: var(--black);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  svg {
    width: 175px;
    height: 175px;
  }

  circle {
    fill: none;
    stroke-width: 5px;
    stroke-linecap: round;
  }

  circle.bg {
    stroke: var(--black-quaternary);
  }

  circle.meter {
    stroke: var(--accent);
    stroke-dashoffset: calc(300px - (${(props) => props.fillPercentage} / 100 * (2 * 3.14 * 40px)));
    stroke-dasharray: 300px;
  }
`;

const CircularProgressBar = ({ progress }) => {
  return (
    <StyledProgressBar fillPercentage={progress}>
      <section>
        <svg viewBox='0 0 100 100'>
          <circle className='bg' cx='50' cy='50' r='40' />
          <circle className='meter' cx='50' cy='50' r='40' />
        </svg>
      </section>
    </StyledProgressBar>
  );
};

export default CircularProgressBar;
