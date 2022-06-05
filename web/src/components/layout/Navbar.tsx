import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

import styles from "./Navbar.module.css";

import { Context } from "../../context/UserContext";
import { useContext } from "react";

export const Navbar = () => {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Logotipo Riboura Cars" />
        <h2>Riboura Cars</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Página Inicial</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login/">Conectar</Link>
            </li>
            <li>
              <Link to="/register/">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
