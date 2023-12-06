import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Poppins } from "next/font/google";
import { UserContext, UserContextType } from "../context/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "@/lib/magic";
import { Web3AuthProvider } from "@/context/Web3AuthContext";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3AuthProvider>
      <main className={` ${inter.className} ${poppins.variable} `}>
        <Component {...pageProps} />
      </main>
    </Web3AuthProvider>
  );
}
