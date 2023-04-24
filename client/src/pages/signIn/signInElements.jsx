import styled from 'styled-components';
import { Container as cont } from '../../theme/appElements';

export const Container = styled(cont)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 16px;

  p {
    font-size: 15px;
    text-align: center;
  }
`;
