import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
//Internal app

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const white = '#fff';
const black = '#000';

// Primary color - Tenant
const primary = '#8142F5';
const primaryLight = '#F3EDFE';
const primaryDark = '#DFD3F4';

//Secondary color - Tenant
const secondary = '#A19DA2';

// Text color variables
const textColor = '#333333';

// Grayscale variables
const greyLight = '#f3f3f3';

const greyNormal = '#d3d3d3';

const greyDark = '#c4c4c4';

const grey400 = '#c4c4c4';

//Color alert
const error = '#F34770';

// Border variables
const borderRadius = 12;

// Font size variables
const h1 = 46;
const h2 = 32;
const h3 = 24;
const h4 = 20;
const h5 = 18;
const text = 16;
const small = 12;

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondary,
    },
    grey: {
      50: greyLight,
      100: greyNormal,
      200: greyDark,
      300: textColor,
      400: grey400,
    },
  },
  //Custom typography
  typography: {
    fontFamily: inter.style.fontFamily,
    fontSize: 20,
    allVariants: {
      color: textColor,
      fontSize: `${text}px`,
    },
    h1: {
      fontSize: `${h1}px`,
      color: black,
    },
    h2: {
      fontSize: `${h2}px`,
    },
    h3: {
      fontSize: `${h3}px`,
    },
    h4: {
      fontSize: `${h4}px`,
    },
    h5: {
      fontSize: `${h5}px`,
    },
    body1: {
      fontSize: `${text}px`,
    },
    caption: {
      fontSize: `${small}px`,
    },
  },
  // Border radius
  shape: {
    borderRadius: borderRadius,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      body{
        padding: 0 !important;
      }

      .fade-in {
        -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
      }

      .color-change-2x {
        -webkit-animation: color-change-2x 0.8s linear alternate both;
        animation: color-change-2x 0.8s linear alternate both;
      }

      @-webkit-keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @-webkit-keyframes color-change-2x {
        0% {
          background: #d9d9d9;
        }
        100% {
          background: #8142f5;
        }
      }
      @keyframes color-change-2x {
        0% {
          background: #d9d9d9;
        }
        100% {
          background: #8142f5;
        }
      }

    input::-ms-reveal,
    input::-ms-clear {
        display: none;
    }
      `,
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#F9F9F9',
          maxWidth: 'initial !important',
          flex: 'auto',
          padding: '0 !important',
          margin: '0 !important',
          minHeight: '100vh',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: textColor,
        },
        input: {
          borderRadius: borderRadius,
          padding: '14.23px 14px !important',
        },
        readOnly: {
          borderColor: 'none',
          '&>fieldset': {
            borderColor: 'none !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: textColor,
          '&:-webkit-autofill': {
            WebkitTextFillColor: textColor,
          },
          '&.Mui-disabled': {
            WebkitTextFillColor: textColor,
            opacity: 0.5,
          },
        },
        root: {
          backgroundColor: white,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: greyNormal,
          },
          '& .MuiFormLabel-root': {
            backgroundColor: secondary,
          },
          '& .MuiInputAdornment-outlined': {
            color: primary,
            '& .MuiButtonBase-root': {
              color: primary,
            },
          },
          ':hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: primary,
            },
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: error,
            },
          },
          fieldset: {
            borderWidth: '.5px',
          },
          '&.Mui-disabled': {
            borderColor: greyNormal,
            color: textColor,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: greyNormal,
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: greyNormal,
            },
          },
          '&.Mui-readOnly': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
          color: textColor,

          '&.Mui-focused': {
            color: textColor,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
          paddingBottom: 8,
          color: textColor,

          '&.Mui-focused': {
            color: textColor,
          },

          '&.Mui-error': {
            color: textColor,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          height: '52px',
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: 16,
          minWidth: 120,
          fontWeight: 500,
          lineHeight: 'normal',
          letterSpacing: '0.4px',
          borderRadius: borderRadius,
          ':hover': {
            boxShadow: 'none',
            backgroundColor: primary,
          },
        },
        outlined: {
          border: `1px solid ${greyNormal}`,
          color: 'inherit',
          gap: 8,
          '&:hover': {
            backgroundColor: primaryLight,
          },
          '& > svg': {
            color: 'inherit',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlinedSuccess: {
          backgroundColor: '#d4ffd6',
        },
        outlinedError: {
          backgroundColor: '#FBE5E5',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: white,
          color: textColor,
          boxShadow: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 49,
          height: 49,
          backgroundColor: primary,
          border: '2px solid white',
          color: white,
          fontSize: 20,
          fontWeight: 500,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: primaryLight,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.breakpoints.down('md') ? '0 12px 12px 0' : 0,
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 24,
          boxShadow: 'none !important',
          border: 'none',
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          maxHeight: 286,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: 'none',
          border: `1px solid ${greyNormal}`,
          marginTop: 20,
          minWidth: 180,
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '16px 16px',
          '&:hover': {
            backgroundColor: primaryLight,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: primaryLight,
          },
          '&.Mui-selected': {
            backgroundColor: primaryLight,
          },
          '&.Mui-disabled': {
            opacity: '1 !important',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: white,
          borderRadius: 8,
          color: textColor,
          border: `1px solid ${greyNormal}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius,
          boxShadow: 'none',
          border: `1px solid ${greyNormal}`,
          padding: 24,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: textColor,
        },
        flexContainer: {
          gap: 8,
          marginBottom: 24,
          '&>button': {
            borderRadius: 12 * 2,
            backgroundColor: primary,
            color: white,
            height: 40,
            minHeight: 40,
            textTransform: 'none',
            '&:not(.Mui-selected)': {
              backgroundColor: 'transparent',
              color: textColor,
            },
          },
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        action: {
          alignSelf: 'center',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          textAlign: 'center',
          '&:last-child': {
            paddingTop: 16,
            paddingBottom: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          },
        },
      },
    },
  },
});

export default theme;
