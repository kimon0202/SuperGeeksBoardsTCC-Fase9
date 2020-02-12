import { View } from 'react-native';
import { StyledComponent } from 'styled-components';
import styled from 'styled-components/native';

import { DefaultTheme } from '../../Utils/Theme';

interface Props {
  isOdd?: boolean;
  selected?: boolean;
  theme: DefaultTheme;
}

export const Container: StyledComponent<
  typeof View,
  DefaultTheme,
  Props
> = styled.View`
  background-color: ${(props: Props) =>
    props.isOdd
      ? props.theme.colors.backgroundTerciaryColor
      : props.theme.colors.backgroundSecondaryColor};

  width: 100px;
  height: 35px;

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${(props: Props) =>
    props.selected
      ? props.theme.colors.accentColor
      : props.theme.colors.textColor};
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`;
