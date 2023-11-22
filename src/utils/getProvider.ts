import { PhantomProvider } from "../../types";

const getProvider = (): PhantomProvider | undefined => {
  if (typeof window !== "undefined" && "phantom" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  return undefined;
};

export default getProvider;
