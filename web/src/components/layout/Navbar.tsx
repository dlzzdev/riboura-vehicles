import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import api from "../../utils/api";
import Logo from "../../assets/img/logo.png";

import { Context } from "../../context/UserContext";
import { useState, useContext, useEffect } from "react";

export const Navbar = () => {
  const { authenticated, logout } = useContext(Context);
  const [user, setUser] = useState<any>({});
  const [token] = useState(localStorage.getItem("token" || ""));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      });
  }, [token]);

  const userImage = () => {
    if (typeof user?.image === "string") {
      return `${process.env.REACT_APP_API}/images/users/${user.image}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  };

  return (
    <nav className="shadow-md shadow-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="w-12" src={Logo} alt="Logotipo" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <nav className="ml-10 space-x-4 list-none">
                <ul className="flex items-center">
                  <li>
                    <Link
                      to="/"
                      className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                    >
                      Página inicial
                    </Link>
                  </li>
                  {authenticated ? (
                    <>
                      <li>
                        <Link
                          to="/vehicle/myvehicles"
                          className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                        >
                          Meus veículos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vehicle/mypurchases"
                          className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                        >
                          Minhas visitas
                        </Link>
                      </li>
                      <div className="dropdown inline-block relative">
                        <button className="text-neutral-300 font-semibold py-2 px-4 rounded inline-flex items-center">
                          <img
                            className="w-10 h-10 rounded-full "
                            src={userImage()}
                            alt="User Avatar"
                          />
                          <svg
                            className="fill-current h-4 w-4 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </button>
                        <ul className="dropdown-menu absolute hidden text-center pt-1">
                          <li>
                            <Link
                              to="/user/profile"
                              className="bg-neutral-900 text-neutral-300 font-semibold hover:text-white transition duration-300 py-2 px-4 block whitespace-no-wrap"
                            >
                              Perfil
                            </Link>
                          </li>
                          <li>
                            <button
                              className="bg-neutral-900 text-neutral-300 font-semibold hover:text-white transition duration-300 pb-4 px-4 block whitespace-no-wrap"
                              onClick={logout}
                            >
                              Desconectar
                            </button>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                      >
                        Conectar
                      </Link>
                      <Link
                        to="/register"
                        className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                      >
                        Registrar
                      </Link>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-100 outline-none ring-2 ring-offset-2 ring-offset-black ring-neutral-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {() => (
          <ul className="flex flex-col text-center px-2 space-y-1 sm:px-3">
            <li className="py-2">
              <Link
                to="/"
                className="p-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Página Inicial
              </Link>
            </li>
            {authenticated ? (
              <>
                <li className="py-1">
                  <Link
                    to="/vehicle/myvehicles"
                    className="p-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Meus carros
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to="/vehicle/mypurchases"
                    className="p-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                  >
                    Minhas visitas
                  </Link>
                </li>
                <li className="py-1">
                  <Link
                    to="/user/profile"
                    className="p-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Perfil
                  </Link>
                </li>
                <li
                  className="p-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                  onClick={logout}
                >
                  Desconectar
                </li>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Conectar
                </Link>
                <Link
                  to="/register"
                  className="py-4 px-2 text-neutral-300 font-semibold hover:text-white transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Registrar
                </Link>
              </>
            )}
          </ul>
        )}
      </Transition>
    </nav>
  );
};
