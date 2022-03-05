import { Heading, HStack, Stack } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Stack bg='darkPrimaryColor' p={10} justify="center" align="center">
      <HStack
        width="100%"
        maxWidth="1280px"
        justify="space-between"
      >
        <HStack spacing={1}>
          <img height={'6px'} width="40px" src='logo.png' alt="" />
          <HStack spacing={0}>
            <Heading ml={2} color='text' as='h1' size='xl' isTruncated>
              Control
            </Heading>
            <Heading color='accentColor' as='h1' size='xl' isTruncated>
              Finance
            </Heading>
          </HStack>
        </HStack>

        <HStack spacing={12}>
          <Heading cursor='pointer' color='text' as='h2' size='sm' isTruncated>
            Overview
          </Heading>
          <Heading cursor='pointer' color='text' as='h2' size='sm' isTruncated>
            Saídas
          </Heading>
          <Heading cursor='pointer' color='text' as='h2' size='sm' isTruncated>
            Entradas
          </Heading>
          <Heading cursor='pointer' color='text' as='h2' size='sm' isTruncated>
            Onde tenho dinheiro
          </Heading>
          <Heading cursor='pointer' color='text' as='h2' size='sm' isTruncated>
            Entrar
          </Heading>
        </HStack>
      </HStack>
    </Stack>
  )
}