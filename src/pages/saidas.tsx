import { Button, FormControl, HStack, Stack, Text } from "@chakra-ui/react";
import { Header } from "../components/header";
import { TextField } from "../components/form/textField";
import { ButtonPrimary } from "../components/form/buttonPrimary";
import { ButtonSecondary } from "../components/form/buttonSecondary";
import { TitlePage } from "../components/titlePage";

export default function Saidas() {

  return (
    <>
      <Header />

      <Stack  minW='300px' my={'40px'} w="full" align={"center"} px={{ base: '20px', md: '40px' }}>
        <TitlePage />
        <Stack
          maxW='1280px'
          w="full"
          bg="text"
          px={{ base: 6, lg: 12 }}
          py={{ base: 6, lg: 8 }}
          borderRadius="15px"
          boxShadow='7px 22px 35px -6px rgb(0 0 0 / 10%)'
          spacing={{ base: 7, lg: 9 }}
        >
          <Text as='h2' fontSize="2xl" fontWeight='bold' color='secondaryText'>
            Adicionar saída
          </Text>

          <Stack spacing={5} direction={{ base: 'column', lg: 'row' }}>
            <Stack spacing={5} direction="column" flex={1}>
              <TextField />
              <TextField />
              <TextField />
            </Stack>
            <Stack spacing={5} direction="column" flex={1}>
              <TextField />
              <TextField />
            </Stack>
          </Stack>

          <HStack spacing={5} justify="flex-end">
            <ButtonPrimary />
            <ButtonSecondary />
          </HStack>
        </Stack>
      </Stack>
    </>
  )
}