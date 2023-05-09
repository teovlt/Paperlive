import React, { useState } from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.div`
  section {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 200px;
    height: 200px;
  }

  circle {
    fill: none;
    stroke-width: 5px;
    stroke-linecap: round;
  }

  circle.bg {
    stroke: #4e4e4e;
  }

  circle.meter {
    stroke: #ff7a59;
    stroke-dashoffset: calc(300px - (${(props) => props.fillPercentage} / 100 * (2 * 3.14 * 40px)));
    stroke-dasharray: 300px;
  }
`;

const CircularProgressBar = () => {
  const [fillPercentage, setFillPercentage] = useState(0);

  const handleRangeChange = (e) => {
    setFillPercentage(e.target.value);
  };

  return (
    <StyledProgressBar fillPercentage={fillPercentage}>
      <section>
        <svg viewBox='0 0 100 100'>
          <circle className='bg' cx='50' cy='50' r='40' />
          <circle className='meter' cx='50' cy='50' r='40' />
        </svg>
        <input
          type='range'
          name=''
          id='range'
          min='0'
          max='100'
          value={fillPercentage}
          onChange={handleRangeChange}
        />
      </section>
    </StyledProgressBar>
  );
};

export default CircularProgressBar;
