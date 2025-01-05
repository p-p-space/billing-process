import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
// Internal App
import btTheme from './bt/uiThemeBt';
import pmTheme from './pm/uiThemepm';
import type { Tenant } from '@/interfaces';

export function createTenantTheme(tenant: Tenant): Theme {
  const themeVars = getTenantTheme(tenant);

  const theme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'class',
    },
    palette: {
      primary: {
        main: themeVars.primary,
        light: themeVars.primaryLight,
        dark: themeVars.primaryDark,
      },
      secondary: {
        main: themeVars.secondary,
      },
      grey: {
        50: themeVars.grey50,
        100: themeVars.grey100,
        200: themeVars.grey200,
        300: themeVars.grey300,
        400: themeVars.grey400,
      },
    },
    //Custom typography
    typography: {
      fontFamily: themeVars.fontFamily,
      fontSize: 20,
      allVariants: {
        color: themeVars.textColor,
        fontSize: `${themeVars.text}px`,
      },
      h1: {
        fontSize: `${themeVars.h1}px`,
        color: themeVars.black,
      },
      h2: {
        fontSize: `${themeVars.h2}px`,
      },
      h3: {
        fontSize: `${themeVars.h3}px`,
      },
      h4: {
        fontSize: `${themeVars.h4}px`,
      },
      h5: {
        fontSize: `${themeVars.h5}px`,
      },
      body1: {
        fontSize: `${themeVars.text}px`,
      },
      caption: {
        fontSize: `${themeVars.small}px`,
      },
    },
    // Border radius
    shape: {
      borderRadius: themeVars.borderRadius,
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
            color: themeVars.textColor,
          },
          input: {
            borderRadius: themeVars.borderRadius,
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
            color: themeVars.textColor,
            '&:-webkit-autofill': {
              WebkitTextFillColor: themeVars.textColor,
            },
            '&.Mui-disabled': {
              WebkitTextFillColor: themeVars.textColor,
              opacity: 0.5,
            },
          },
          root: {
            backgroundColor: themeVars.white,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: themeVars.grey100,
            },
            '& .MuiFormLabel-root': {
              backgroundColor: themeVars.secondary,
            },
            '& .MuiInputAdornment-outlined': {
              color: themeVars.primary,
              '& .MuiButtonBase-root': {
                color: themeVars.primary,
              },
            },
            ':hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: themeVars.primary,
              },
            },
            '&.Mui-error': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: themeVars.error,
              },
            },
            fieldset: {
              borderWidth: '.5px',
            },
            '&.Mui-disabled': {
              borderColor: themeVars.grey100,
              color: themeVars.textColor,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: themeVars.grey100,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderColor: themeVars.grey100,
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
            color: themeVars.textColor,

            '&.Mui-focused': {
              color: themeVars.textColor,
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 16,
            paddingBottom: 8,
            color: themeVars.textColor,

            '&.Mui-focused': {
              color: themeVars.textColor,
            },

            '&.Mui-error': {
              color: themeVars.textColor,
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
            borderRadius: themeVars.borderRadius,
            ':hover': {
              boxShadow: 'none',
              backgroundColor: themeVars.primary,
            },
          },
          outlined: {
            border: `1px solid ${themeVars.grey100}`,
            color: 'inherit',
            gap: 8,
            '&:hover': {
              backgroundColor: themeVars.primaryLight,
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
            backgroundColor: themeVars.white,
            color: themeVars.textColor,
            boxShadow: 'none',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: 49,
            height: 49,
            backgroundColor: themeVars.primary,
            border: '2px solid white',
            color: themeVars.white,
            fontSize: 20,
            fontWeight: 500,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: themeVars.primaryLight,
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
            border: `1px solid ${themeVars.grey100}`,
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
              backgroundColor: themeVars.primaryLight,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover': {
              backgroundColor: themeVars.primaryLight,
            },
            '&.Mui-selected': {
              backgroundColor: themeVars.primaryLight,
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
            backgroundColor: themeVars.white,
            borderRadius: 8,
            color: themeVars.textColor,
            border: `1px solid ${themeVars.grey100}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: themeVars.borderRadius,
            boxShadow: 'none',
            border: `1px solid ${themeVars.grey100}`,
            padding: 24,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            color: themeVars.textColor,
          },
          flexContainer: {
            gap: 8,
            marginBottom: 24,
            '&>button': {
              borderRadius: 12 * 2,
              backgroundColor: themeVars.primary,
              color: themeVars.white,
              height: 40,
              minHeight: 40,
              textTransform: 'none',
              '&:not(.Mui-selected)': {
                backgroundColor: 'transparent',
                color: themeVars.textColor,
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

  return theme;
}

const getTenantTheme = (tenant: Tenant) => {
  const tenantThemes = {
    bt: btTheme,
    pm: pmTheme,
  };

  const themeVars = {
    ...tenantThemes['bt'],
    ...(tenantThemes[tenant] || {}),
  };

  return themeVars;
};
