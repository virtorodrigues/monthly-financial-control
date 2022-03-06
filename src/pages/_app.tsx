import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { LoginModalProvider } from '../core/contexts/loginModal'
import { Login } from '../components/login'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LoginModalProvider>
        <Component {...pageProps} />

        <Login />
      </LoginModalProvider>
    </ChakraProvider>
  )
}

export default MyApp
