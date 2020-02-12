import { createContext } from 'react';

import { darkTheme } from '../Theme';

const ThemeContext = createContext({ theme: darkTheme, switchTheme: () => {} });

export default ThemeContext;
