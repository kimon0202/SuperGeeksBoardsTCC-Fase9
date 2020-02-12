import styled from 'styled-components/native';

interface PaddingProps {
  height: number;
}

export const Container = styled.View`
  background: ${props => props.theme.colors.backgroundColor};
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const PaddingContainer = styled.View`
  height: ${(props: PaddingProps) => props.height}px;
  width: 100%;
  background-color: transparent;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto';
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const TextLink = styled.Text`
  font-family: 'Roboto';
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
