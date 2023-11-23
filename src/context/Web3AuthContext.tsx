import { IProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { createContext, useState, useContext } from "react";
import { OpenloginUserInfo } from "@web3auth/openlogin-adapter";
import RPC from "../hooks/solanaRPC";

interface Web3AuthContextProps {
  user: OpenloginUserInfo | null;
  address: string[] | null;
  web3auth: Web3AuthNoModal | null;
  provider: IProvider | null;
  loggedIn: boolean | null;
  setWeb3auth: React.Dispatch<React.SetStateAction<Web3AuthNoModal | null>>;
  setProvider: React.Dispatch<React.SetStateAction<IProvider | null>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  getUserInfo: () => Promise<void>;
  getAccounts: () => Promise<string[] | null>;
}

export const Web3AuthContext = createContext<Web3AuthContextProps | undefined>(
  undefined
);

export const Web3AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<OpenloginUserInfo | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
  const [address, setAddress] = useState<string[] | null>(null);

  const getUserInfo = async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet");
      return;
    }
    try {
      const user = await web3auth.getUserInfo();
      //console.log("user info is", user);

      // Update the user state in the context
      setUser(user as OpenloginUserInfo);
    } catch (error) {
      console.error("Error fetching user info", error);
      // Handle errors as needed
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      console.error("provider not initialized yet");
      return null;
    }
    const rpc = new RPC(provider);
    const accounts = await rpc.getAccounts();

    // Update the address state in the context
    setAddress(accounts);
    return accounts;
  };

  return (
    <Web3AuthContext.Provider
      value={{
        user,
        address,
        web3auth,
        provider,
        loggedIn,
        setWeb3auth,
        setProvider,
        setLoggedIn,
        getUserInfo,
        getAccounts,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
  }
  return context;
};
