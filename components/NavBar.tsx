import { Button, Text, Card, Link, Icon } from "@chakra-ui/react";
import NextLink from 'next/link'
import {BiHomeAlt2} from "react-icons/bi"
import {FiSettings} from "react-icons/fi"


export default function NavBar() {
return (
    <>
    <Card >
        <Button>
            <BiHomeAlt2 />
            Home</Button>

        <Button> Activity </Button>
        
        <Button>Analytics</Button>
<Button>
    <FiSettings />
    Settings</Button>
       <Button><Link as={NextLink} href='/login'> Logout </Link></Button>
       </Card>
    </>
)
}