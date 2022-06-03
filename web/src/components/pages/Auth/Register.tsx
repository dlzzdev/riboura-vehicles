import { Input } from "../../form/Input";
import styles from "../../form/Form.module.css";
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
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Celular"
          type="text"
          name="phone"
          placeholder="Digite o seu celular"
          handleOnChange={handleChange}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirme sua senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem uma conta? <Link to="/login/">Clique aqui</Link>{" "}
      </p>
    </section>
  );
};
