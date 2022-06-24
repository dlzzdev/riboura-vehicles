import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { CarForm } from "../../form/CarForm";
import { useParams } from "react-router-dom";
import { useFlashMessage } from "../../../hooks/useFlashMessage";

export const EditCar = () => {
  const [car, setCar] = useState<any>({});
  const { setFlashMessage } = useFlashMessage();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/vehicles/${id}`)
      .then((response) => {
        setCar(response.data.vehicle);
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }, [id, setFlashMessage]);

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
      .patch(`/vehicles/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  return (
    <section className="min-h-screen">
      <div className="text-center">
        <p className="text-xl mb-6 mt-2 text-neutral-100">
          Após este processo o véiculo ficará disponível para venda.
        </p>
      </div>
      {car.model && (
        <CarForm handleSubmit={updateCar} btnText="Atualizar" carData={car} />
      )}
    </section>
  );
};
