import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  async function register(user: any) {
    try {
      const data = await api
        .post("/users/register", user)
        .then((res) => res.data);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return { register };
}
