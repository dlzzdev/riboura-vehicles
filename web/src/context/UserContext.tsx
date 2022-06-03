import { createContext } from "react";
import UseAuth from "../hooks/UseAuth";

type UserContextType = {
  user?: any;
  register: (user: any) => void;
  authenticated: boolean;
  login: (user: any) => void;
  logout: (user: any) => void;
};

const Context = createContext({} as UserContextType);

function UserProvider({ children }: any) {
  const { authenticated, register, login, logout } = UseAuth();

  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
