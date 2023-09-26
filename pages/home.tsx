import { Button, Text, Card } from "@chakra-ui/react";
import NavBar from "@/components/NavBar";

import {MdOutlineRadioButtonUnchecked} from "react-icons/md"

export default function home (){
    return (
        <>
        <Text>WAVESURF by SplitWave</Text>
        <Button>Lite
            <MdOutlineRadioButtonUnchecked />
            Pro</Button>
        <NavBar />
        </>
    )
    
    
}