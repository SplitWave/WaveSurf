import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Poppins } from "next/font/google";
import { Web3Provider } from "../context/Web3Context";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <UserProvider>
        <main className={` ${inter.className} ${poppins.variable} `}>
          {/* <HeaderLayout isLoggedIn={isLoggedIn} /> */}
          <Component {...pageProps} />
        </main>
      </UserProvider>
    </Web3Provider>
  );
}
