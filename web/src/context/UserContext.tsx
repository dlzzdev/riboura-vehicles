import { createContext } from "react";
import UseAuth from "../hooks/UseAuth";

type UserContextType = {
  user?: any;
  register: (user: any) => void;
};

const Context = createContext({} as UserContextType);

function UserProvider({ children }: any) {
  const { register } = UseAuth();

  return <Context.Provider value={{ register }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
