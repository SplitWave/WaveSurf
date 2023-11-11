import { MagicUserMetadata } from "magic-sdk";
import { createContext, Dispatch, SetStateAction } from "react";

export type UserContextType = {
  user?: {
    issuer?: string; // Add this line if issuer is part of the user object
    // Other properties of the user object
  } | null;
  magicUserMetadata?: MagicUserMetadata;
};

export const UserContext = createContext<
  [
    UserContextType | undefined,
    Dispatch<SetStateAction<UserContextType | undefined>>
  ]
>([undefined, () => {}]);
