import { useState, useContext } from "react";
import { Input } from "../../form/Input";
import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    login(user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-neutral-200">
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-400">
            ou
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {" "}
              crie uma conta
            </Link>
          </p>
        </div>
        <div className="rounded bg-neutral-900 max-w-md rounded overflow-hidden p-5 text-neutral-200">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Digite o seu email"
                  handleOnChange={handleChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Digite a sua senha"
                  handleOnChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Conectar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
