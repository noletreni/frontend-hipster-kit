import createPalette from 'material-ui/styles/palette';
import {
  red,
  blue,
  orange,
  grey,
  white,
  black,
  darkBlack,
} from 'material-ui/styles/colors';

export default {
  // Spacing config of app. Sets the size of various components.
  spacing: {
    // material-ui@next
    unit: 8,

    // Old material-ui
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },

  /*
  Palette of the app. This is used by the material-ui@next.
  */
  palette: createPalette({
    primary: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#b20738',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
      A100: '#ff8a80',
      A200: '#ff5252',
      A400: '#ff1744',
      A700: '#d50000',
      contrastDefaultColor: 'light',
    },
    accent: orange,
    error: red,
    type: 'light',
  }),

  /*
  Palette of the app. This is used by the old version of material-ui. Colors can be supplied as:
    - material-ui color codes (http://www.material-ui.com/#/customization/colors):
        Colors.green300
    - HTML hex color codes:
        '#123456'
    - RGBA colors:
        'rgba(255, 255, 255, 1) '
  */
  legacyPalette: {
    primary1Color: '#b20738',
    primary2Color: '#b20738',
    primary3Color: grey[700],
    accent1Color: orange[500],
    accent2Color: grey[200],
    accent3Color: grey[600],
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: grey[50],
    borderColor: grey[300],
    disabledColor: grey[700],
    pickerHeaderColor: '#b20738',
    clockCircleColor: grey[300],
    shadowColor: black,
  },
};
