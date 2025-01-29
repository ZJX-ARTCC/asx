'use client';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        light: false,
        dark: {
            palette: {
                mode: "dark",
                primary: {
                    main: '#500E0E',
                    contrastText: '#EDEDF5',
                },
            }
        },
    },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#500E0E',
            contrastText: '#EDEDF5',
        }
    }
});

export default theme;