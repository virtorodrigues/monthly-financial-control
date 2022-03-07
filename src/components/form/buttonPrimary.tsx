import { Button, ButtonProps } from "@chakra-ui/react"
import { FormEvent } from "react";

type ButtonPrimaryProps = ButtonProps & {
  text?: string;
  onClick?: (e: FormEvent) => void;
};

export const ButtonPrimary = ({ text = 'confirmar', onClick, ...rest }: ButtonPrimaryProps) => {

  return (
    <Button variant='solid' bg='accentColor' onClick={onClick} {...rest}>
      {text}
    </Button>
  )
}