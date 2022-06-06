import api from "../../../utils/api";
import { useState, useEffect } from "react";
import styles from "./AddCar.module.css";
import { CarForm } from "../../form/CarForm";
import { useParams } from "react-router-dom";
import UseFlashMessage from "../../../hooks/UseFlashMessage";

export const EditCar = () => {
  const [car, setCar] = useState<any>({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { SetFlashMessage } = UseFlashMessage();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCar(response.data.car);
      })
      .catch((err) => {
        SetFlashMessage(err.response.data.message, "error");
      });
  }, [id, token, SetFlashMessage]);

  async function updateCar(car: any) {
    const formData = new FormData();
    await Object.keys(car).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < car.images.length; i++) {
          formData.append(`images`, car.images[i]);
        }
      } else {
        formData.append(key, car[key]);
      }
    });

    await api
      .patch(`/cars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        SetFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        SetFlashMessage(err.response.data.message, "error");
      });
  }

  return (
    <section>
      <div className={styles.addcar_header}>
        <h1>Modificando o veículo: {car.model}</h1>
        <p>Após a edição,os dados serão atualizados no sistema.</p>
      </div>
      {car.model && (
        <CarForm handleSubmit={updateCar} btnText="Atualizar" carData={car} />
      )}
    </section>
  );
};
