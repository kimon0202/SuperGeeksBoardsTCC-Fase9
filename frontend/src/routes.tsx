import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthLoading from './pages/AuthLoading';
import BoardView from './pages/BoardView';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';

const authStack = createStackNavigator(
  {
    Login,
    Signup,
  },
  {
    initialRouteName: 'Login',
  },
);

const appStack = createStackNavigator({
  Main,
  BoardView,
});

const app = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      Auth: authStack,
      App: appStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default app;
