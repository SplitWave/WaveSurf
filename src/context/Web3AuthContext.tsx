import { IProvider } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { createContext, useState, useContext } from "react";
import { OpenloginUserInfo } from "@web3auth/openlogin-adapter";

interface Web3AuthContextProps {
  user: OpenloginUserInfo | null;
  web3auth: Web3AuthNoModal | null;
  provider: IProvider | null;
  loggedIn: boolean | null;
  setWeb3auth: React.Dispatch<React.SetStateAction<Web3AuthNoModal | null>>;
  setProvider: React.Dispatch<React.SetStateAction<IProvider | null>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  getUserInfo: () => Promise<void>;
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

  return (
    <Web3AuthContext.Provider
      value={{
        user,
        web3auth,
        provider,
        loggedIn,
        setWeb3auth,
        setProvider,
        setLoggedIn,
        getUserInfo,
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
