import { useContext } from "react"
import { LoginModalContext } from "../contexts/loginModal"

export const useLoginModalContext = () => {
  const context = useContext(LoginModalContext);

  if (!context) {
    new Error('useLoginModalContext need to LoginModalProvider!');
  }

  return context;
}