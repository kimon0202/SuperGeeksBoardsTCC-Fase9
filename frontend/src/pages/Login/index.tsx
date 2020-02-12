import React, { useRef, useState } from 'react';
import { AsyncStorage, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';

import Logo from '../../assets/icon-dark.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { ButtonText, Container, ErrorText, PaddingContainer, TextLink } from './styles';

function Login({ navigation }) {
  // State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginErrors, setErrors] = useState<Array<string>>([]);

  // References
  const passwordRef = useRef(null);

  // Functions
  async function login() {
    const data = {
      email,
      password,
    };

    const response = await api.post('/login', data);

    if (response.status === 200) {
      const { token } = response.data;

      await AsyncStorage.setItem('@token', token);
      navigation.navigate('App');
    } else {
      const { errors } = response.data;
      setErrors(errors);
    }
  }

  function renderErrors() {
    if (loginErrors) {
      loginErrors.map(error => {
        return <ErrorText>{error}</ErrorText>;
      });
    }
  }

  // Visual
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ width: '100%', height: '100%' }}
      >
        <Container>
          <Logo width={298} height={76} />
          <PaddingContainer height={20} />
          {renderErrors()}
          <PaddingContainer height={20} />
          <Input
            value={email}
            onChange={setEmail}
            placeholder="E-mail Address"
            onEndEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <PaddingContainer height={20} />
          <Input
            ref={passwordRef}
            value={password}
            onChange={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <PaddingContainer height={40} />
          <Button onPress={login}>
            <ButtonText>Login</ButtonText>
          </Button>
          <PaddingContainer height={10} />
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <TextLink>Create a free account</TextLink>
          </TouchableOpacity>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

Login.navigationOptions = {
  headerShown: false,
};

export default Login;
