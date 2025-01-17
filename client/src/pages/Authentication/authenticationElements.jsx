import styled from 'styled-components';
import { Container as AppContainer, Button as AppButton } from '../../theme/appElements';

export const Container = styled(AppContainer)`
  min-height: 100vh;
  padding-block: 3.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Form = styled.form`
  width: 330px;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
`;

export const DivLanguageIcon = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 3.2rem;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const Button = styled(AppButton)`
  width: 100%;
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: calc(32px + 18px);
  right: calc(32px + 18px);
  transform: translateY(-50%);
`;
