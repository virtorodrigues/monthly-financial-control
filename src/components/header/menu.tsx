import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Show,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineMenu } from 'react-icons/ai';
import { Items } from './items';

export const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <>
      <Show above='lg'>
        <HStack spacing={12}>
          <Items />
        </HStack>
      </Show>
      <Show below='lg'>
        <IconButton
          colorScheme='none'
          aria-label='Search database'
          icon={<AiOutlineMenu onClick={onOpen} color='#fff' size={25} />}
        />
      </Show>

      {isMobile && (
        <Drawer placement='right' onClose={onClose} isOpen={isOpen} >
          <DrawerOverlay />
          <DrawerContent bg='darkPrimaryColor'>
            <DrawerCloseButton mt={2} mr={2} size='md' onClick={onClose} color='text' />
            <DrawerBody>
              <VStack spacing={10} align="start" mt='20px'>
                <Items />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}