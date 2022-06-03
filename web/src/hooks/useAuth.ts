import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import UseFlashMessage from "./UseFlashMessage";

export default function UseAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { SetFlashMessage } = UseFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user: any) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/users/register", user)
        .then((res) => res.data);

      authUser(data);
    } catch (e: any) {
      msgText = e.response.data.message;
      msgType = "error";
    }

    SetFlashMessage(msgText, msgType);
  }

  async function authUser(data: any) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  async function login(user: any) {
    let msgText = "Login realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api.post("/users/login", user).then((res) => res.data);

      authUser(data);
    } catch (e: any) {
      msgText = e.response.data.message;
      msgType = "error";
    }

    SetFlashMessage(msgText, msgType);
  }

  async function logout(user: any) {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    navigate("/");
    SetFlashMessage(msgText, msgType);
  }


  return { authenticated, register, login, logout };
}
