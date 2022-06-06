import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./CarDetails.module.css";
import UseFlashMessage from "../../../hooks/UseFlashMessage";

export const CarDetails = () => {
  const [car, setCar] = useState<any>({});
  const { id } = useParams();
  const { SetFlashMessage } = UseFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/cars/${id}`).then((res) => {
      setCar(res.data.car);
    });
  }, [id]);

  async function schedule() {
    await api
      .patch(`/cars/schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        SetFlashMessage(res.data.message, "success");
      })
      .catch((err) => {
        SetFlashMessage(err.response.data.message, "error");
      });
  }

  return (
    <>
      {car.model && (
        <section className={styles.car_details_container}>
          <div className={styles.car_details_header}>
            <h1>
              {car.brand} - {car.model} - {car.year}
            </h1>
            <p>Se tiver interesse, marque uma visita ao vendedor.</p>
          </div>
          <div className={styles.car_images}>
            {car.images.map((image: any, index: number) => (
              <img
                src={`${process.env.REACT_APP_API}/images/cars/${image}`}
                alt={car.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className="bold">Marca:</span> {car.brand}
          </p>
          <p>
            <span className="bold">Modelo:</span> {car.model}
          </p>
          <p>
            <span className="bold">Ano:</span> {car.year}
          </p>
          <p>
            <span className="bold">Quilometragem:</span> {car.milage}
          </p>
          <p>
            <span className="bold">Preço:</span> R${car.price}
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma visita</button>
          ) : (
            <p>
              Você precisa estar <Link to="/login">autenticado</Link> a uma
              conta para agendar uma visita.
            </p>
          )}
        </section>
      )}
    </>
  );
};
