import { useCallback, useEffect, useState } from 'react';
import { HStack, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Header } from "../components/header";
import { TextField } from "../components/form/textField";
import { ButtonPrimary } from "../components/form/buttonPrimary";
import { TitlePage } from "../components/titlePage";
import { Login } from "../components/login";
import { SelectField } from "../components/form/selectField";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, Resolver } from 'react-hook-form'
import { database } from '../services/firebase';
import { onValue, push, ref, set } from 'firebase/database';


type CreateMoneyOutProps = {
  key?: string;
  year: string;
  month: string;
  description?: string;
  paymentType: string;
  moneyComeFrom: string;
  date: string;
  price: string;
  paymentFixed: string;
};

const OptionsMonth = () => {
  return (
    <>
      <option>Março</option>
      <option>Janeiro</option>
      <option>Fevereiro</option>
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
      <option>Pix</option>
      <option>Boleto</option>
      <option>Dinheiro</option>
      <option>Débito</option>
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
  //description: yup.string().required('Campo obrigatório'),
  paymentType: yup.string().required('Campo obrigatório'),
  moneyComeFrom: yup.string().required('Campo obrigatório'),
  date: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
  paymentFixed: yup.string().required('Campo obrigatório'),
});

export default function Saidas() {
  const [isLoading, setIsLoading] = useState(false);
  const [listMoneyOut, setListMoneyOut] = useState<CreateMoneyOutProps[]>([]);

  const fieldsVariant = useBreakpointValue({ base: 'outline', lg: 'unstyled' });
  const textAdd = useBreakpointValue({ base: 'Adicionar', lg: '+' });

  const { register, handleSubmit, reset, formState } = useForm<CreateMoneyOutProps>({
    resolver: yupResolver(createMoneyOutFormSchema)
  });

  const { errors } = formState;

  useEffect(() => {
    //outMoney

    const firebaseRef = ref(database, `/outMoney`);
    onValue(firebaseRef, (snapshot) => {
      const data = snapshot.val();

      const dataFormatted = Object.entries(data).map(outMoney => {

        return ({
          ...outMoney[1] as CreateMoneyOutProps,
          key: outMoney[0],
        })
      });

      console.log(dataFormatted)
      setListMoneyOut(dataFormatted);

    });

  }, []);


  const handleCreateMoneyOut: SubmitHandler<CreateMoneyOutProps> = async (values) => {
    console.log(values);
    setIsLoading(true);

    const outMoneyListRef = ref(database, `/outMoney`);
    const outMoneyRef = push(outMoneyListRef);

    set(outMoneyRef, {
      year: values.year,
      month: values.month,
      description: values.description,
      paymentType: values.paymentType,
      moneyComeFrom: values.moneyComeFrom,
      date: values.date,
      price: values.price,
      paymentFixed: values.paymentFixed,
    });

    reset({
      year: '2022',
      month: 'Março',
      description: '',
      paymentType: 'Pix',
      moneyComeFrom: '',
      date: '',
      price: '',
      paymentFixed: 'Não fixo',
    });

    await new Promise(resolve => setTimeout(() => {
      setIsLoading(false);
    }, 200));
  }

  return (
    <>
      <Header />
      <Login />
      <Stack minW='300px' my={'40px'} w="full" align={"center"} px={{ base: '20px', md: '40px' }}>
        <TitlePage title={'Saídas'} />

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

            {!!listMoneyOut.length && (
              <Stack spacing={8} w='full'>
                {listMoneyOut.map((outMoney) => (
                  <Stack
                    w='full'
                    key={outMoney.key}
                    direction="row"
                    borderBottom={{ lg: '1px solid' }}
                    borderBottomColor={{ lg: 'rgb(189, 189, 189, 0.4)' }}
                    spacing={3}
                    pb={'8px'}>
                    <Text flex={1}>{outMoney.paymentType}</Text>
                    <Text flex={1}>{outMoney.moneyComeFrom}</Text>
                    <Text flex={1}>{outMoney.date}</Text>
                    <Text flex={1}>{outMoney.price}</Text>
                    <Text flex={1}>{outMoney.paymentFixed}</Text>
                    <Text flex={1}>{outMoney.description}</Text>
                  </Stack>
                ))}

              </Stack>
            )}

            <Stack
              w='full'
              spacing={5}
              borderBottom={{ lg: '1px solid' }}
              borderBottomColor={{ lg: 'rgb(189, 189, 189, 0.4)' }}
              pb={'8px'}
              direction={{ base: 'column', lg: 'row' }}
              align='baseline'
            >

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
              <TextField
                id="description"
                type="text"
                placeholder="Descrição (opcional)"
                variant={fieldsVariant}
                {...register("description")}
                error={errors.description}
              />

              <ButtonPrimary text={textAdd} type="submit" isLoading={isLoading} />
            </Stack>
          </VStack>
        </Stack>
      </Stack>
    </>
  )
}