import React, { useContext } from 'react';
import { AsyncStorage, TouchableOpacity } from 'react-native';

import Button from '../../components/Button';
import { Icon } from '../../components/Entry/styles';
import ThemeContext from '../../Utils/contexts/ThemeContext';
import { PaddingContainer } from '../Main/styles';
import { AddButtonText, Container, Header, HeaderText, ModalTitle } from './styles';

const screen = function Options({ navigation }) {
  const { switchTheme } = useContext(ThemeContext);

  return (
    <Container>
      <PaddingContainer height={30} />
      <Button
        onPress={async () => {
          await AsyncStorage.setItem('@token', '');
          navigation.navigate('Auth');
        }}
      >
        <AddButtonText>Logout</AddButtonText>
      </Button>
      <PaddingContainer height={30} />
      <ModalTitle>Theme</ModalTitle>
      <PaddingContainer height={30} />
      <Button onPress={switchTheme}>
        <AddButtonText>Switch Theme</AddButtonText>
      </Button>
    </Container>
  );
};

screen.navigationOptions = ({ navigation }) => {
  return {
    header: () => (
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <HeaderText>Options</HeaderText>
      </Header>
    ),
  };
};

export default screen;
