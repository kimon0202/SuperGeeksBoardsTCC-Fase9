import { TouchableOpacity } from 'react-native';
import { StyledComponent } from 'styled-components';
import styled from 'styled-components/native';

import { DefaultTheme } from '../../Utils/Theme';

interface Props {
  type: 'normal' | 'small';
}

export const Touchable: StyledComponent<
  typeof TouchableOpacity,
  DefaultTheme,
  Props
> = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.accentColor};
  width: ${(props: Props) => (props.type === 'small' ? 50 : 75)}%;
  height: 60px;

  justify-content: center;
  align-items: center;
`;
