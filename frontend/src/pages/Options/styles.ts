import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.backgroundColor};

  align-items: center;

  padding: 0 30px;
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

export const ModalTitle = styled.Text`
  color: ${props => props.theme.colors.textColor};
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 30px;
  text-transform: uppercase;

  text-align: center;
  width: 100%;
  /* height: 20%; */
`;
