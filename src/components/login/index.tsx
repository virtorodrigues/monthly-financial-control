import {
  Button, Modal, ModalBody, ModalContent,
  ModalHeader, ModalOverlay, Stack, Text
} from '@chakra-ui/react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useLoginModalContext } from '../../core/hooks/useLoginModalContext';

export const Login = () => {
  const { isOpen, onClose } = useLoginModalContext();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Stack spacing={10} padding='50px' paddingTop='25px'>
            <Stack spacing={0}>
              <ModalHeader pb={0} fontSize='3xl' color="secondaryText">Fazer login</ModalHeader>
              <Text pl={6} fontSize='sm' color="secondaryText">É necessário fazer o login para ter acesso as informações presentes neste site! 😉</Text>
            </Stack>
            <ModalBody>
              <Stack spacing={7}>
                <Button leftIcon={<BsFacebook size={20} />} bg='#1877F2' color="text" variant='solid'>
                  Logar com o Facebook
                </Button>
                <Button leftIcon={<FcGoogle size={25} />} colorScheme='text' color="primaryText" variant='outline'>
                  Logar com o Google
                </Button>
              </Stack>
            </ModalBody>
          </Stack>

        </ModalContent>
      </Modal>
    </>
  )
}