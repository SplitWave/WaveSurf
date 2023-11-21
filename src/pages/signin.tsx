import { useContext, useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import {
  CHAIN_NAMESPACES,
  IProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import RPC from "../hooks/solanaRPC";
import Image from "next/image";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useRouter } from "next/router";

const SignInPage = () => {
 const clientId ="BJsCGNF_TNTjH-dMR0yK_-c9MkZDr8uhVFV4KrXNj51rDRcx33uqOJOY7ESb_uIiko0gaKsgJSEhS_o5SR3MJHA";
 const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
 const [provider, setProvider] = useState<IProvider | null>(
      null
    );
 const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
 const router = useRouter();
    useEffect(() => {
        const init = async () => {
          try {
            const chainConfig = {
              chainNamespace: CHAIN_NAMESPACES.SOLANA,
              chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
              rpcTarget: "https://far-didi-fast-mainnet.helius-rpc.com/",
              displayName: "Solana Mainnet Beta",
              blockExplorer: "https://solana.fm/",
              ticker: "SOL",
              tickerName: "Solana",
            };
            const web3auth = new Web3AuthNoModal({
              clientId,
              chainConfig,
              web3AuthNetwork: "cyan",
            });
    
            setWeb3auth(web3auth);
            const privateKeyProvider = new SolanaPrivateKeyProvider({ config: { chainConfig } });

            const openloginAdapter = new OpenloginAdapter({
              privateKeyProvider,
              adapterSettings: {
                uxMode: "redirect",
              }
            });
            web3auth.configureAdapter(openloginAdapter);
    
            await web3auth.init();
            setProvider(web3auth.provider);
            if (web3auth.connected) {
              setLoggedIn(true);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
      }, []);

// for uiConsole
      function uiConsole(...args: any[]): void {
        const el = document.querySelector("#console>p");
        if (el) {
          el.innerHTML = JSON.stringify(args || {}, null, 2);
        }
      }
      const login = async () => {
        if (!web3auth) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        const web3authProvider = await web3auth.connectTo(
          WALLET_ADAPTERS.OPENLOGIN,
          {
            loginProvider: "google",
          },
        );
        setProvider(web3authProvider);
        
      };

      const authenticateUser = async () => {
        if (!web3auth) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        const idToken = await web3auth.authenticateUser();
        uiConsole(idToken);
        router.push("/dashboard");
      };
      const logout = async () => {
        if (!web3auth) {
          uiConsole("web3auth not initialized yet");
          return;
        }
        await web3auth.logout();
        setProvider(null);
        setLoggedIn(false);
      };

      return (
        <div className=" bg-[#00A7E1] w-full h-full ">
                 <div className=" w-full  bg-white mobile:px-[0.9375rem] mobile:py-[0.625rem] landingDesktop:px-0 landingDesktop:py-[0.625rem] ">
            <div className=" flex flex-row items-center landingDesktop:ml-[3.5625rem] ">
              <div className=" relative mobile:w-[3.125rem] mobile:h-[3.125rem] landingDesktop:w-[4rem] landingDesktop:h-[4rem] ">
                <Image
                  src="/assets/SVG/logo.svg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h1 className=" mobile:ml-[0.625rem] landingDesktop:ml-[1.5625rem] landingDesktop:mr-[2.875rem] mobile:text-[1.5rem] landingDesktop:text-[2rem] font-light  text-[#605C5C] ">
                WaveSurf
              </h1>
            </div>
          </div>
          <div className=" w-full h-full relative py-[6.25rem]">
            <div className=" m-auto mobile:w-4/5 landingDesktop:w-[28.25rem] z-20 rounded-[0.9375rem] bg-white shadow-md py-[2rem] mobile:px-[0.9375rem] landingDesktop:px-0 ">
              <h1 className=" font-medium text-[1.125rem] text-center text-gray-700 ">
                Login with
              </h1>
              <div className=" w-4/5 mobile:mt-[0.9375rem] landingDesktop:mt-[2.1875rem] justify-evenly m-auto flex flex-row items-center ">
               
                <div
                  className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center "
                  onClick={login}
                >
                  <FaGoogle size={31} />
                </div>
                <button onClick={logout}  className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center ">
            Log Out
          </button>
              </div>
                  </div>
                    </div>
          </div>
      
      );
    };
    
    export default SignInPage;