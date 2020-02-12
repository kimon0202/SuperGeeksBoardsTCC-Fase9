import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import Logo from '../../assets/icon-dark.svg';
import { Container } from './styles';

export default function AuthLoading({ navigation }) {
  useEffect(() => {
    checkForLoggedUser();
  }, []);

  async function checkForLoggedUser() {
    const token = await AsyncStorage.getItem('@token');
    navigation.navigate(token ? 'App' : 'Auth');
  }

  return (
    <Container>
      <Logo width={298} height={76} />
    </Container>
  );
}
