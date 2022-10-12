import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    color: {
      menu: string;
      menuHover: string;
      uyuni: string;
      grey: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    color?: {
      menu?: string;
      menuHover: string;
      uyuni: string;
      grey: string;
    };
  }
}

const MaterialTheme = createTheme({
  color: {
    menu: '#122C44',
    menuHover: 'rgba(255, 255, 255, 0.08)',
    uyuni: '#04abfc',
    grey: '#d8d8d8', 
  },
});

export default MaterialTheme;