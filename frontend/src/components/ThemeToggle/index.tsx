import React from 'react';

import { Toggle } from './styles';

export default function ThemeToggle({ switchTheme }) {
  return <Toggle onPress={switchTheme} />;
}
