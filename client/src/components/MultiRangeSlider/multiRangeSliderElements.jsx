import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Slider = styled.div`
  position: relative;
  width: 100%;
`;

export const Thumb = styled.input`
  /* Removing default appearance */
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;

  &.left {
    z-index: 3;
    &::-webkit-slider-thumb {
      background-color: var(--accent);
    }
    &::-moz-range-thumb {
      background-color: var(--accent);
    }
  }
  &.right {
    z-index: 4;
    &::-webkit-slider-thumb {
      background-color: var(--accent);
    }
    &::-moz-range-thumb {
      background-color: var(--accent);
    }
  }

  /* For Chrome browsers */
  &::-webkit-slider-thumb {
    border: 1px solid var(--white);
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  /* For Firefox browsers */
  &::-moz-range-thumb {
    border: 1px solid var(--white);
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

export const Track = styled.div`
  position: absolute;
  border-radius: 0.3rem;
  height: 0.5rem;
  background: var(--black-quaternary);
  width: 100%;
  z-index: 1;
`;

export const Range = styled.div`
  position: absolute;
  border-radius: 0.3rem;
  height: 0.5rem;
  background: var(--accent);
  z-index: 2;
`;

export const Value = styled.div`
  position: absolute;
  color: var(--accent);
  font-size: 1.2rem;
  margin-top: 2rem;

  &.left {
    left: 0.06rem;
  }
  &.right {
    right: -0.04rem;
  }
`;
