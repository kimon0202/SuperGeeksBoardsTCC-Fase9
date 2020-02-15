import styled from 'styled-components/native';

import { PaddingContainer } from '../Signup/styles';

interface HorizontalPaddingContainerProps {
  width: number;
}

interface ModalContainerProps {
  height: number;
}

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.backgroundColor};

  align-items: center;

  padding: 0 30px;
`;

export const ModalContainer = styled(Container)`
  justify-content: center;
  height: ${(props: ModalContainerProps) =>
    props.height ? props.height : 70}%;
  width: 100%;
`;

export const AddModalButtonsWrapper = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const SafeArea = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

export const Separator = styled.View`
  width: 15px;
`;

export { PaddingContainer };

export const HorizontalPaddingContainer = styled.View`
  height: 100%;
  width: ${(props: HorizontalPaddingContainerProps) => props.width}px;
`;

export const Header = styled.View`
  background-color: ${props => props.theme.colors.backgroundDarker};
  height: 70px;
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: ${props => props.theme.colors.accentColor};
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 25px;
  text-transform: uppercase;

  text-align: center;
  width: 80%;
`;

export const AddButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 22px;
  color: ${props => props.theme.colors.textColor};
  width: 100%;
  text-align: center;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  width: 100%;
  height: 100%;
`;
