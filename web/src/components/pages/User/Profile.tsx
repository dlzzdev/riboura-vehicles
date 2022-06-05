import { useState, useEffect } from "react";
import formStyles from "../../form/Form.module.css";
import { Input } from "../../form/Input";
import styles from "./Profile.module.css";
import api from "../../../utils/api";
import UseFlashMessage from "../../../hooks/UseFlashMessage";
import { RoundedImage } from "../../layout/RoundedImage";

export const Profile = () => {
  const [user, setUser]: any = useState({
    image: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    _id: "",
  });
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token" || ""));
  const { SetFlashMessage } = UseFlashMessage();

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

  function onFileChange(e: any) {
    setPreview(e.target.files[0]);
    setUser({
      ...user,
      image: e.target.files[0],
    });
  }
  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let msgText = "";
    let msgType = "";

    const formData = new FormData();
    await Object.keys(user).forEach((key: any) => {
      formData.append(key, user[key]);
    });

    console.log(user);

    await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        msgText = res.data.message;
        msgType = "success";
      })
      .catch((err) => {
        msgType = "error";
        msgText = err.response.data.message;
      });

    SetFlashMessage(msgText, msgType);
  }
  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
          value={user.email || ""}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senhha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  );
};
