import Image from "next/image";
import { FaGoogle, FaApple } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/router";
import { useWeb3Auth } from "@/context/Web3AuthContext";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import {
  OpenloginAdapter,
  OpenloginUserInfo,
} from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import RPC from "../hooks/solanaRPC";

export interface UserData {
  user: OpenloginUserInfo;
  address: string[];
}

const LoginPage = () => {
  //const [user, setUser] = useContext(UserContext);
  const initialValues = {
    email: "",
  };
  const [disabled, setDisabled] = useState<boolean>(false);
  const clientId =
    "BJsCGNF_TNTjH-dMR0yK_-c9MkZDr8uhVFV4KrXNj51rDRcx33uqOJOY7ESb_uIiko0gaKsgJSEhS_o5SR3MJHA";
  const router = useRouter();
  const {
    user,
    web3auth,
    loggedIn,
    provider,
    setProvider,
    setLoggedIn,
    setWeb3auth,
    getUserInfo,
    getAccounts,
  } = useWeb3Auth();

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
        const privateKeyProvider = new SolanaPrivateKeyProvider({
          config: { chainConfig },
        });

        const openloginAdapter = new OpenloginAdapter({
          privateKeyProvider,
          adapterSettings: {
            uxMode: "redirect",
          },
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

  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn === true) {
        await getUserInfo();

        const address = await getAccounts();

        if (user && address) {
          addDataToFirestore(user.verifierId, { user, address });
        }

        router.push("/dashboard");
      }
    };

    fetchData();
  }, [loggedIn, router, getUserInfo]);

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
      }
    );
    setProvider(web3authProvider);
    setLoggedIn(true);
  };

  async function handleLoginWithEmail(email: string) {}
  // Function to add data to Firestore
  const addDataToFirestore = async (userId: string, dataToAdd: UserData) => {
    try {
      // Check if the document already exists
      const docRef = doc(db, "usermetadata", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document already exists, updating data:");
        // If the document exists, you can update the data if needed
        //await updateDoc(docRef, dataToAdd);
      } else {
        console.log("Document does not exist, creating new document.");
        // If the document does not exist, create a new one
        await setDoc(docRef, dataToAdd);
      }

      console.log("Data added to Firestore successfully!");
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
      // Handle errors as needed
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = (values: any) => {
    //console.log("Form data:", values)
    handleLoginWithEmail(values.email);
  };

  const [enabled, setEnabled] = useState(false);

  return (
    <div className=" bg-[#00A7E1] w-full h-full ">
      {/* <div className=" absolute -top-20 left-1 ">
        <ReactSVG src="/assets/SVG/bg1.svg" />
      </div>
      <div className=" absolute top-40 ">
        <ReactSVG src="/assets/SVG/bg2.svg" />
      </div> */}
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
            <div className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center ">
              <FaApple size={31} />
            </div>
            <div
              className=" w-[4.6875rem] h-[4.6875rem] rounded-[0.9375rem] text-black border-[0.0625rem] border-gray-200 flex items-center justify-center "
              onClick={login}
            >
              <FaGoogle size={31} />
            </div>
          </div>
          <h1 className="   font-medium text-center text-[1.125rem] text-gray-400 my-[1.3125rem] ">
            or
          </h1>
          {/* <div className=" mt-[1.25rem] ">
            <EmailForm
              disabled={disabled}
              onEmailSubmit={handleLoginWithEmail}
            />
          </div> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className=" landingDesktop:px-[3.9375rem] text-gray-400 ">
              <div className=" mt-[1.5rem] ">
                <label
                  htmlFor="email"
                  className=" text-black font-normal text-[0.875rem] "
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  className=" w-full h-[3.125rem] px-[1.25rem] rounded-[0.9375rem] border-[0.0625rem] border-gray-200 mt-[0.3125rem] "
                />
                <ErrorMessage name="email" component="div" />
              </div>

              <div className=" flex flex-row items-center mt-[1.5rem] ">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-[#00A7E1]" : "bg-black"}
                  relative  inline-flex h-[1.125rem] w-[2.625rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-6" : "translate-x-0"}
                      pointer-events-none inline-block h-[0.8125rem] w-[0.8125rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
                <h1 className=" text-black font-normal text-[0.75rem] ml-[0.625rem] ">
                  Remember me
                </h1>
              </div>
              <div className=" mt-[2.25rem] text-white font-bold text-[0.625rem] w-full h-[2.8125rem] px-[0.5rem] bg-[#00A7E1] flex flex-row justify-center items-center rounded-[0.75rem] ">
                <PiTelegramLogo size={18} />
                <button type="submit" className=" ml-[0.625rem] ">
                  Send Magic Link
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
