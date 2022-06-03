import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import UseFlashMessage from "./UseFlashMessage";

export default function UseAuth() {
  async function register(user: any) {
    const { SetFlashMessage } = UseFlashMessage();

    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "success";

    try {
      const data = await api
        .post("/users/register", user)
        .then((res) => res.data);

      console.log(data);
    } catch (e: any) {
      msgText = e.response.data.message;
      msgType = "error";
    }

    SetFlashMessage(msgText, msgType);
  }

  return { register };
}
