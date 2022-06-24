import { Input } from "../../form/Input";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";

export const Register = () => {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    register(user);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-100">
            Crie a sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-400">
            ou
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {" "}
              conecte-se em uma conta já existente.
            </Link>
          </p>
        </div>
        <div className="rounded bg-neutral-900 max-w-md rounded overflow-hidden p-5 text-neutral-200">
          <form className="space-y-" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid gap-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Digite o seu nome"
                  handleOnChange={handleChange}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Digite o seu celular"
                  handleOnChange={handleChange}
                />
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
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme a sua senha"
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
