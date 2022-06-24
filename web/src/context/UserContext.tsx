import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

type UserContextType = {
  user?: any;
  register: (user: any) => void;
  authenticated: boolean;
  login: (user: any) => void;
  logout: (user: any) => void;
};

const Context = createContext({} as UserContextType);

function UserProvider({ children }: any) {
  const { authenticated, register, login, logout } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
