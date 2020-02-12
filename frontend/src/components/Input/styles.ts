import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  width: 75%;
  height: 60px;

  background-color: ${props => props.theme.colors.backgroundSecondaryColor};

  padding-left: 20px;

  color: ${props => props.theme.colors.textColor};
  font-family: 'Roboto';
  font-size: 18px;
`;
