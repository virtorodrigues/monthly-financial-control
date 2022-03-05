import { Heading, Stack } from '@chakra-ui/react'
import { ButtonPrimary } from './form/buttonPrimary'

export const TitlePage = () => {

  return (
    <Stack
      w='full'
      maxW='1280px'
      direction='row'
      justify='space-between'
      borderBottom={'1px solid'}
      borderBottomColor='separator'
      pb={{ base: '10px', lg: '30px' }}
      mb={{ base: '25px', lg: '40px' }}
    >
      <Heading as='h1' size='2xl' fontWeight='regular'>
        Saídas
      </Heading>
      <ButtonPrimary />
    </Stack>
  )
}