import { Button, ButtonProps, Spinner } from "@chakra-ui/react"
import { FormEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type ButtonPrimaryProps = ButtonProps & {
  text?: string;
  onClick?: (e: FormEvent) => void;
  isLoading?: boolean;
};

export const ButtonPrimary = ({ text = 'confirmar', onClick, isLoading = false, ...rest }: ButtonPrimaryProps) => {

  return (

    <Button bg='accentColor' onClick={onClick} {...rest}
      isLoading={isLoading}
      loadingText=''
      variant='outline'
      leftIcon={<AiOutlinePlus size={20} />}
      iconSpacing={0}
    >
      {isLoading && <Spinner size='sm' />}
    </Button>

  )
}