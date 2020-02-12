import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { DefaultTheme } from '../../Utils/Theme';
import { AddButtonText, HorizontalPaddingContainer, SafeArea } from '../Main/styles';
import { PaddingContainer } from '../Signup/styles';

interface EntryProps {
  isOdd: boolean;
  theme: DefaultTheme;
}

interface IconProps {
  color: string;
  theme: DefaultTheme;
}

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundColor};
`;

export const ModalContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  height: 70%;
`;

export const AddModalButtonsWrapper = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;

  justify-content: center;
  align-items: center;
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
  font-size: 22px;
  text-transform: uppercase;

  text-align: left;
  width: 80%;

  padding-left: 25px;
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${(props: IconProps) =>
    props.color ? props.color : props.theme.colors.accentColor};
`;

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 20%;
`;

export const GroupButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.backgroundDarker};

  justify-content: center;
  align-items: center;
`;

export const GroupsContainer = styled.View`
  flex-direction: row;
  padding-top: 30px;

  justify-content: center;
`;

export const EntriesContainer = styled.View`
  width: 100%;
  height: 100%;

  padding-top: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const AddEntryButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.accentColor};
  width: 70%;
  height: 30px;
`;

export const EmptyListContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export {
  AddButtonText,
  PaddingContainer,
  HorizontalPaddingContainer,
  SafeArea,
};

export const EntryContainer = styled.View`
  align-self: center;

  width: 80%;
  height: 40px;

  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;

  background: ${(props: EntryProps) =>
    props.isOdd
      ? props.theme.colors.backgroundSecondaryColor
      : props.theme.colors.backgroundTerciaryColor};
`;

export const EntryText = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-size: 20px;

  width: 70%;
  margin-right: 30px;
`;
