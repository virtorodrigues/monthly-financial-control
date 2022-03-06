import { ReactNode } from "react";

export type LoginModalProvider = {
  children: ReactNode;
};

export type LoginModalContextProvider = {
  isOpen: boolean;
  handleOnOpen: () => void;
  onClose: () => void;
};


export type ItemProps = {
  title: string;
  action?: () => void;
}