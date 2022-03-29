import { ReactElement, useCallback, useEffect, useState } from 'react';
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

type CreditCardBillProps = {
  key?: string;
  billState: string;
  price: string;
  myBank: string;
  year: string;
  month: string;
};

type MyBankProps = {
  key?: string;
  name: string;
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

const OptionsBillState = () => {
  return (
    <>
      <option>Aberta</option>
      <option>Fechada</option>
    </>
  )
};

const createMoneyOutFormSchema = yup.object({
  year: yup.string().required('Campo obrigatório'),
  month: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
  myBank: yup.string().required('Campo obrigatório'),
  billState: yup.string().required('Campo obrigatório'),
});

export default function Saidas() {
  const [isLoading, setIsLoading] = useState(false);
  const [creditCardBill, setCreditCardBill] = useState<CreditCardBillProps[]>([]);
  const [myBanks, setMyBanks] = useState<MyBankProps[]>([]);

  const fieldsVariant = useBreakpointValue({ base: 'outline', lg: 'unstyled' });
  const textAdd = useBreakpointValue({ base: 'Adicionar', lg: '+' });

  const { register, handleSubmit, reset, formState } = useForm<CreditCardBillProps>({
    resolver: yupResolver(createMoneyOutFormSchema)
  });

  const { errors } = formState;

  useEffect(() => {
    const myBankRef = ref(database, `/myBanks`);
    onValue(myBankRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataFormatted = data ? Object.entries(data).map(myBanks => {

          return ({
            ...myBanks[1] as MyBankProps,
            key: myBanks[0],
          })
        }) : [];

        setMyBanks(dataFormatted);
      }
    });


    const firebaseRef = ref(database, `/creditCardBill`);
    onValue(firebaseRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataFormatted = data ? Object.entries(data).map(myBanks => {

          return ({
            ...myBanks[1] as CreditCardBillProps,
            key: myBanks[0],
          })
        }) : [];

        setCreditCardBill(dataFormatted);
      }
    });

  }, []);

  const MyBank = () => (
    !!myBanks.length
      ? <>{myBanks.map((bank) => <option key={bank.key}>{bank.name}</option>)}</>
      : <option>Cadastre ao menos um banco</option >
  )

  const handleCreateMoneyOut: SubmitHandler<CreditCardBillProps> = async (values) => {
    setIsLoading(true);

    const myBankListRef = ref(database, `/creditCardBill`);
    const myBankRef = push(myBankListRef);

    set(myBankRef, {
      year: values.year,
      month: values.month,
      price: values.price,
      myBank: values.myBank,
      billState: values.billState,
    });

    reset({
      price: '',
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
        <TitlePage title={'Fatura do cartão de crédito'} />

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
            Adicionar fatura do cartão de crédito
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

            {!!creditCardBill.length && (
              <Stack spacing={8} w='full'>
                {creditCardBill.map((creditBill) => (
                  <Stack
                    w='full'
                    key={creditBill.key}
                    direction="row"
                    borderBottom={{ lg: '1px solid' }}
                    borderBottomColor={{ lg: 'rgb(189, 189, 189, 0.4)' }}
                    spacing={3}
                    pb={'8px'}>
                    <Text flex={1}>{creditBill.myBank}</Text>
                    <Text flex={1}>{creditBill.price}</Text>
                    <Text flex={1}>{creditBill.billState}</Text>
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
                id="myBank"
                options={<MyBank />}
                variant={fieldsVariant}
                {...register("myBank")}
                error={errors.myBank}
              />

              <TextField
                id="price"
                type="number"
                placeholder="Valor atual da fatura"
                variant={fieldsVariant}
                {...register("price")}
                error={errors.price}
              />

              <SelectField
                id="billState"
                options={<OptionsBillState />}
                variant={fieldsVariant}
                {...register("billState")}
                error={errors.billState}
              />

              <ButtonPrimary text={textAdd} type="submit" isLoading={isLoading} />
            </Stack>
          </VStack>
        </Stack>
      </Stack>
    </>
  )
}