import { createContext, Dispatch, SetStateAction } from "react";

export type UserContextType = {
  user: any; // Change 'any' to the appropriate type for the user data
};

export const UserContext = createContext<
  [
    UserContextType | undefined,
    Dispatch<SetStateAction<UserContextType | undefined>>
  ]
>([undefined, () => {}]);
