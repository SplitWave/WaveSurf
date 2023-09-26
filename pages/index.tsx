

import styles from '@/styles/Home.module.css'
import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'



export default function Home() {
  return (
    <>

    <Button><Link as={NextLink} href='/home'> Home </Link></Button>
    <Button><Link as={NextLink} href='/login'> Login </Link> </Button>

      </>
  )
}
