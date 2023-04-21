import styled from 'styled-components';
import { Container as AppContainer } from '../../theme/appElements';

export const Container = styled(AppContainer)`
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 56px repeat(2, 1fr);
`;
