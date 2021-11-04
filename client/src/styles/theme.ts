import { createTheme } from '@mui/material/styles';
// A custom theme for this app
const theme = {
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    },
  },
  sidebarWidth: 240,
} as const;
export type CustomTheme = {
  [Key in keyof typeof theme]: typeof theme[Key];
};
declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export default createTheme(theme);
