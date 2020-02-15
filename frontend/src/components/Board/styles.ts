import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Icon = styled(MaterialIcons)`
  color: ${props => props.theme.colors.textColor};
`;

export const Container = styled.View`
  height: 250px;
  width: 200px;
  background-color: ${props => props.theme.colors.backgroundSecondaryColor};

  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

export const TextInput = styled.TextInput`
  font-family: 'Roboto';
  font-size: 18px;
  color: ${props => props.theme.colors.textColor};
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 16px;
`;

export const Image = styled.Image`
  width: 200px;
  height: 70%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

export const Touchable = styled.TouchableOpacity`
  width: 200px;
  height: 70%;
`;

export const TouchableImage = styled(Image)`
  height: 100%;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 30%;
  justify-content: space-around;
  padding: 20px 20px;
`;
