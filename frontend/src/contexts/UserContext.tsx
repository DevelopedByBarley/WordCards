import React, { createContext, Dispatch, SetStateAction, useState } from "react";

export type User = {
  email: string | null,
  password: string | null,
  capacity: number | null,
  cardsForRepeat: [] | null
};

type UserContextType = {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
};

type UserContextProviderProps = {
  children: React.ReactNode
};

export const UserContext = createContext<UserContextType>({
  user: { email: null, password: null, capacity: null, cardsForRepeat: [] },
  setUser: () => { }
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>({ email: null, password: null, capacity: null, cardsForRepeat: [] });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

