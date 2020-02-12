import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.backgroundColor};
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;
