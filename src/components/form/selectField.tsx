import { FormControl, FormErrorMessage, FormLabel, InputProps, Select, SelectProps } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { FieldError } from "react-hook-form";

type SelectFieldProps = SelectProps & {
  id: string;
  label?: string;
  options: ReactNode;
  error?: FieldError;
};

const SelectElement
  : ForwardRefRenderFunction<HTMLSelectElement, SelectFieldProps>
  = ({ id, label, options, error = null, ...rest }, ref) => {

    return (
      <FormControl isInvalid={!!error}>
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <Select id={id} {...rest} ref={ref}>
          {options}
        </Select>
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }

export const SelectField = forwardRef(SelectElement);