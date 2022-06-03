import { createContext } from "react";
import useAuth from "../hooks/useAuth";

type UserContextType = {
  user?: any;
  register: (user: any) => void;
};

const Context = createContext({} as UserContextType);

function UserProvider({ children }: any) {
  const { register } = useAuth();

  return <Context.Provider value={{ register }}>{children}</Context.Provider>;
}

export { Context, UserProvider };
