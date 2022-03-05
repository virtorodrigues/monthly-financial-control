import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading, HStack, Stack, useDisclosure, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { Items } from "./items"
import { Show, Hide } from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai';
import { Menu } from "./menu";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack bg='darkPrimaryColor' p={{ base: 5, md: 10 }} justify="center" align="center">
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

        <Menu />
      </HStack>
    </Stack >
  )
}