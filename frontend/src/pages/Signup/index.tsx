import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from 'react-native';

import Logo from '../../assets/icon-dark.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { ButtonText, Container, PaddingContainer, TextLink } from './styles';

function Signup({ navigation }) {
  // State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signupErrors, setErrors] = useState<Array<string>>([]);

  // References
  const passwordRef = useRef(null);

  // Functions
  async function signup() {
    const data = {
      email,
      password,
    };

    const response = await api.post('/users', data);

    if (response.status === 200) {
      navigation.navigate('Login');
    } else {
      const { errors } = response.data;
      setErrors(errors);
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
          <Button onPress={signup}>
            <ButtonText>Singup</ButtonText>
          </Button>
          <PaddingContainer height={10} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <TextLink>Return to login</TextLink>
          </TouchableOpacity>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

Signup.navigationOptions = {
  headerShown: false,
};

export default Signup;
