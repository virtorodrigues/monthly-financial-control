import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getDatabase, ref, set } from "firebase/database";
import { database } from '../services/firebase';
import { Heading } from '@chakra-ui/react';
import { Header } from '../components/header';

const Home: NextPage = () => {

  function writeUserData(name: string) {
    const db = database;
    set(ref(db, 'users'), {
      username: name,
    });
  }
  return (
   <Header />
  )
}

export default Home
