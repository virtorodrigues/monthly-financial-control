import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputProps } from "@chakra-ui/react"
import { ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type TextFieldProps = InputProps & {
  id: string;
  type: string;
  label?: string;
  error?: FieldError;
}

const InputBase
  : ForwardRefRenderFunction<HTMLInputElement, TextFieldProps>
  = ({ id, type, label, error = null, ...rest }, ref) => {

    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <Input id={id} type={type} {...rest} ref={ref} />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }

export const TextField = forwardRef(InputBase);