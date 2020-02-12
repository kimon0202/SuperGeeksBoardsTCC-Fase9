import React, { useEffect, useState } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import RootContainer from './src/components/RootContainer';
import Routes from './src/routes';
import ThemeContext from './src/Utils/contexts/ThemeContext';
import { darkTheme, lightTheme } from './src/Utils/Theme';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<string>();

  useEffect(() => {
    setTheme();
    getTheme();
  }, []);

  async function setTheme() {
    await AsyncStorage.setItem('@theme', 'dark');
  }

  async function getTheme() {
    const theme = await AsyncStorage.getItem('@theme');
    setActiveTheme(theme);
  }

  async function switchTheme() {
    if (activeTheme === 'dark') {
      setActiveTheme('light');
      await AsyncStorage.setItem('@theme', 'light');
    } else {
      setActiveTheme('dark');
      await AsyncStorage.setItem('@theme', 'dark');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme: darkTheme, switchTheme }}>
      <ThemeContext.Consumer>
        {theme => (
          <>
            <StatusBar
              translucent
              barStyle="dark-content"
              backgroundColor={darkTheme.colors.backgroundColor}
            />
            <ThemeProvider
              theme={activeTheme === 'light' ? lightTheme : darkTheme}
            >
              <RootContainer>
                <Routes />
              </RootContainer>
            </ThemeProvider>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}
