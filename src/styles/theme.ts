import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primaryColor: '#673AB7',
    lightPrimaryColor: '#D1C4E9',
    darkPrimaryColor: '#512DA8',
    text: '#FFFFFF',
    primaryText: '#212121',
    secondaryText: '#757575',
    accentColor: '#FFC107',
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: '#F6F6F6',
        color: 'primaryText'
      }
    }
  }
})