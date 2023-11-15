import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Poppins } from "next/font/google";
import { UserContext, UserContextType } from "../context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { magic } from "@/lib/magic";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserContextType>();
  //const [user, setUser] = useContext(UserContext);

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setUser({ loading: true });
    //console.log("magic data", magic?.user);
    magic?.user.isLoggedIn().then((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        magic?.user.getMetadata().then((userData: any) => {
          console.log("userdata in app.tsx", userData);
          setUser(userData);
        });
      } else {
        router.push("/login");
        setUser({ user: null });
      }
    });
  }, []);

  // Redirect to /dashboard if the user is logged in
  // useEffect(() => {
  //   console.log("users data in app.tsx", user);
  //   user?.user?.issuer && router.push("/dashboard");
  // }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <main className={` ${inter.className} ${poppins.variable} `}>
        {/* <HeaderLayout isLoggedIn={isLoggedIn} /> */}
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
