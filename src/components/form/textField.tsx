import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"

export const TextField = () => {

  return (
    <FormControl>
      <FormLabel htmlFor='email'>Email address</FormLabel>
      <Input id='email' type='email' />
    </FormControl>
  )
}