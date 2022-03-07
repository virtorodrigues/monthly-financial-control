import { FormEvent } from 'react';
import { Button, FormControl, FormControlProps, HStack, Stack, Text, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
import { Header } from "../components/header";
import { TextField } from "../components/form/textField";
import { ButtonPrimary } from "../components/form/buttonPrimary";
import { ButtonSecondary } from "../components/form/buttonSecondary";
import { TitlePage } from "../components/titlePage";
import { Login } from "../components/login";
import { SelectField } from "../components/form/selectField";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, Resolver } from 'react-hook-form'


type CreateMoneyOutProps = {
  year: string;
  month: string;
  title: string;
  paymentType: string;
  moneyComeFrom: string;
  date: string;
  price: string;
  paymentFixed: string;
};

const OptionsMonth = () => {
  return (
    <>
      <option>Janeiro</option>
      <option>Fevereiro</option>
      <option>Março</option>
      <option>Abril</option>
      <option>Maio</option>
      <option>Junho</option>
      <option>Julho</option>
      <option>Agosto</option>
      <option>Setembro</option>
      <option>Outubro</option>
      <option>Novembro</option>
      <option>Dezembro</option>
    </>
  )
};

const OptionsYear = () => {
  return (
    <>
      <option>2022</option>
      <option>2021</option>
      <option>2020</option>
    </>
  )
};

const OptionsPaymentType = () => {
  return (
    <>
      <option>Crédito</option>
      <option>Débito</option>
      <option>Pix</option>
      <option>Boleto</option>
      <option>Dinheiro</option>
    </>
  )
};

const OptionsPaymentFixed = () => {
  return (
    <>
      <option>Não fixo</option>
      <option>Fixo</option>
    </>
  )
};

const createMoneyOutFormSchema = yup.object({
  year: yup.string().required('Campo obrigatório'),
  month: yup.string().required('Campo obrigatório'),
  title: yup.string().required('Campo obrigatório'),
  paymentType: yup.string().required('Campo obrigatório'),
  moneyComeFrom: yup.string().required('Campo obrigatório'),
  date: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
  paymentFixed: yup.string().required('Campo obrigatório'),
});

export default function Saidas() {
  const fieldsVariant = useBreakpointValue({ base: 'outline', lg: 'unstyled' });
  const textAdd = useBreakpointValue({ base: 'Adicionar', lg: '+' });

  const { register, handleSubmit, formState } = useForm<CreateMoneyOutProps>({
    resolver: yupResolver(createMoneyOutFormSchema)
  });

  const { errors } = formState;

  const handleCreateMoneyOut: SubmitHandler<CreateMoneyOutProps> = async (values) => {
    console.log(values);
    console.log(errors);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return (
    <>
      <Header />
      <Login />
      <Stack minW='300px' my={'40px'} w="full" align={"center"} px={{ base: '20px', md: '40px' }}>
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

          <VStack
            as="form"
            onSubmit={handleSubmit(handleCreateMoneyOut)}
            spacing={12}
            align="flex-start"
            justify="flex-start"
            direction={{ base: 'column', lg: 'row' }}
          >
            <HStack spacing={5} direction="column" >
              <SelectField
                id="year"
                label="Ano"
                options={<OptionsYear />}
                {...register("year")}
                error={errors.year}
              />
              <SelectField
                id="month"
                label="Mês"
                options={<OptionsMonth />}
                {...register("month")}
                error={errors.month}
              />
            </HStack>
            <Stack
              w='full'
              spacing={5}
              borderBottom={{ lg: '1px solid' }}
              borderBottomColor={{ lg: 'rgb(189, 189, 189, 0.4)' }}
              pb={'8px'}
              direction={{ base: 'column', lg: 'row' }}
              align='baseline'
            >
              <TextField
                id="title"
                type="text"
                placeholder="Titulo. Ex: fatura"
                variant={fieldsVariant}
                {...register("title")}
                error={errors.title}
              />
              <SelectField
                id="paymentType"
                options={<OptionsPaymentType />}
                variant={fieldsVariant}
                {...register("paymentType")}
                error={errors.paymentType}
              />
              <TextField
                id="moneyComeFrom"
                type="text"
                placeholder="De onde saiu?"
                variant={fieldsVariant}
                {...register("moneyComeFrom")}
                error={errors.moneyComeFrom}
              />
              <TextField
                id="date"
                type="date"
                placeholder="Data"
                variant={fieldsVariant}
                {...register("date")}
                error={errors.date}
              />
              <TextField
                id="price"
                type="number"
                placeholder="Valor"
                variant={fieldsVariant}
                {...register("price")}
                error={errors.price}
              />
              <SelectField
                id="paymentFixed"
                options={<OptionsPaymentFixed />}
                variant={fieldsVariant}
                {...register("paymentFixed")}
                error={errors.paymentFixed}
              />
              <ButtonPrimary text={textAdd} type="submit" />
            </Stack>
          </VStack>
        </Stack>
      </Stack>
    </>
  )
}