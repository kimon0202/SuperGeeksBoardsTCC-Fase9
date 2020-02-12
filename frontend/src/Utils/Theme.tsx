import React from 'react';
import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      backgroundColor: string;
      backgroundSecondaryColor: string;
      backgroundTerciaryColor: string;
      backgroundDarker: string;
      textColor: string;
      textError: string;
      accentColor: string;
    };

    fonts: {
      family: Array<string>;
    };
  }
}

const lightTheme: DefaultTheme = {
  colors: {
    backgroundColor: '#f5f1ed',
    backgroundSecondaryColor: '#f7f7f7',
    backgroundTerciaryColor: '#f0f0f0',
    backgroundDarker: '#d6d1cd',
    textColor: '#000',
    textError: '#c75252',
    accentColor: '#379392',
  },

  fonts: {
    family: ['sans-serif', 'Roboto'],
  },
};

const darkTheme: DefaultTheme = {
  colors: {
    backgroundColor: '#343238',
    backgroundSecondaryColor: '#59575e',
    backgroundTerciaryColor: '#46454b',
    backgroundDarker: '#141316',
    textColor: '#fff',
    textError: '#c75252',
    accentColor: '#379392',
  },

  fonts: {
    family: ['sans-serif', 'Roboto'],
  },
};

export { lightTheme, darkTheme, DefaultTheme };
