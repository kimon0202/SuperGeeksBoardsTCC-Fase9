import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { DefaultTheme } from '../../Utils/Theme';

interface EntryProps {
  isOdd: boolean;
  theme: DefaultTheme;
}

interface IconProps {
  color: string;
  theme: DefaultTheme;
}

export const Icon = styled(MaterialCommunityIcons)`
  color: ${(props: IconProps) =>
    props.color ? props.color : props.theme.colors.accentColor};
`;

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
