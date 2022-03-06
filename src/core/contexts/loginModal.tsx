import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode } from "react";
import { LoginModalContextProvider, LoginModalProvider } from "../types";

const LoginModalContext = createContext({} as LoginModalContextProvider);

const LoginModalProvider = ({ children }: LoginModalProvider) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnOpen = () => {
    console.log('clicou no open');
    onOpen();
  }

  return (
    <LoginModalContext.Provider value={{ isOpen, handleOnOpen, onClose }}>
      {children}
    </LoginModalContext.Provider>
  )
}

export { LoginModalProvider, LoginModalContext };