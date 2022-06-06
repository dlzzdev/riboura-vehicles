import styles from "./AddCar.module.css";
import api from "../../../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFlashMessage from "../../../hooks/UseFlashMessage";
import { CarForm } from "../../form/CarForm";

export const AddCar = () => {
  const { SetFlashMessage } = UseFlashMessage();
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  async function RegisterCar(car: any) {
    let msgType = "success";

    const formData = new FormData();
    await Object.keys(car).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < car[key].length; i++) {
          formData.append(`images`, car[key][i]);
        }
      } else {
        formData.append(key, car[key]);
      }
    });

    await api
      .post("/cars/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        SetFlashMessage(response.data.message, msgType);
        navigate("/car/mycars");
      })
      .catch((err) => {
        msgType = "error";
        SetFlashMessage(err.response.data.message, msgType);
      });
  }

  return (
    <section>
      <div className={styles.addcar_header}>
        <h1>Adicionar carro</h1>
        <p>Após este processo o véiculo ficará dispooínvel para venda.</p>
      </div>
      <CarForm handleSubmit={RegisterCar} btnText="Cadastrar veículo" />
    </section>
  );
};
