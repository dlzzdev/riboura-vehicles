import { createContext } from "react";
import UseAuth from "../hooks/UseAuth";

type UserContextType = {
  user?: any;
  register: (user: any) => void;
  authenticated: boolean;
  logout: (user: any) => void;
};

const Context = createContext({} as UserContextType);

function UserProvider({ children }: any) {
  const { authenticated, register, logout } = UseAuth();

  return (
    <Context.Provider value={{ authenticated, register, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
