import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export default styled.View`
  padding-top: ${StatusBar.currentHeight}px;
  flex: 1;
`;
