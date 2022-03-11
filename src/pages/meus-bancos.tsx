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


type MyBankProps = {
  key?: string;
  name: string;
  price: string;
};

const createMoneyOutFormSchema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  price: yup.string().required('Campo obrigatório'),
});

export default function Saidas() {
  const [isLoading, setIsLoading] = useState(false);
  const [listMyBank, setListMyBank] = useState<MyBankProps[]>([]);

  const fieldsVariant = useBreakpointValue({ base: 'outline', lg: 'unstyled' });
  const textAdd = useBreakpointValue({ base: 'Adicionar', lg: '+' });

  const { register, handleSubmit, reset, formState } = useForm<MyBankProps>({
    resolver: yupResolver(createMoneyOutFormSchema)
  });

  const { errors } = formState;

  useEffect(() => {
    //myBanks

    const firebaseRef = ref(database, `/myBanks`);
    onValue(firebaseRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataFormatted = Object.entries(data).map(myBanks => {

          return ({
            ...myBanks[1] as MyBankProps,
            key: myBanks[0],
          })
        });

        console.log(dataFormatted)
        setListMyBank(dataFormatted);
      }
    });

  }, []);


  const handleCreateMoneyOut: SubmitHandler<MyBankProps> = async (values) => {
    setIsLoading(true);

    const myBankListRef = ref(database, `/myBanks`);
    const myBankRef = push(myBankListRef);

    set(myBankRef, {
      name: values.name,
      price: values.price,
    });

    reset({
      name: '',
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
        <TitlePage title={'Meus bancos'} />

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
            Adicionar meus bancos
          </Text>

          <VStack
            as="form"
            onSubmit={handleSubmit(handleCreateMoneyOut)}
            spacing={12}
            align="flex-start"
            justify="flex-start"
            direction={{ base: 'column', lg: 'row' }}
          >

            {!!listMyBank.length && (
              <Stack spacing={8} w='full'>
                {listMyBank.map((outMoney) => (
                  <Stack
                    w='full'
                    key={outMoney.key}
                    direction="row"
                    borderBottom={{ lg: '1px solid' }}
                    borderBottomColor={{ lg: 'rgb(189, 189, 189, 0.4)' }}
                    spacing={3}
                    pb={'8px'}>
                    <Text flex={1}>{outMoney.name}</Text>
                    <Text flex={1}>{outMoney.price}</Text>
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


              <TextField
                id="name"
                type="text"
                placeholder="Nome"
                variant={fieldsVariant}
                {...register("name")}
                error={errors.name}
              />
              <TextField
                id="price"
                type="number"
                placeholder="Quanto tenho?"
                variant={fieldsVariant}
                {...register("price")}
                error={errors.price}
              />
              <ButtonPrimary text={textAdd} type="submit" isLoading={isLoading} />
            </Stack>
          </VStack>
        </Stack>
      </Stack>
    </>
  )
}