import { MagicUserMetadata } from "magic-sdk";
import { createContext, Dispatch, SetStateAction } from "react";

export type UserContextType = {
  user?: MagicUserMetadata | null;
  loading?: boolean;
};

export const UserContext = createContext<
  [
    UserContextType | undefined,
    Dispatch<SetStateAction<UserContextType | undefined>>
  ]
>([undefined, () => {}]);
