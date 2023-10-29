import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Poppins } from "next/font/google";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3Provider } from "../context/Web3Context";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif",
    //heading: "Inter, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <UserProvider>
          <main className={` ${inter.className} ${poppins.variable} `}>
            {/* <HeaderLayout isLoggedIn={isLoggedIn} /> */}
            <Component {...pageProps} />
          </main>
        </UserProvider>
      </Web3Provider>
    </ChakraProvider>
  );
}
