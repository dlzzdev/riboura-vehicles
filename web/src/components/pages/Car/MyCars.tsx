import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UseFlashMessage from "../../../hooks/UseFlashMessage";
import { RoundedImage } from "../../layout/RoundedImage";
import styles from "./Dashboard.module.css";
import api from "../../../utils/api";

export const MyCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { SetFlashMessage } = UseFlashMessage();

  useEffect(() => {
    api
      .get("/cars/mycars", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCars(response.data.cars);
      })
      .catch((err) => {
        SetFlashMessage(err.response.data.message, "error");
      });
  }, [SetFlashMessage, token]);

  return (
    <section>
      <div className={styles.carslist_header}>
        <h1>Meus carros</h1>
        <Link to="/car/add">Adicionar carro</Link>
      </div>
      <div className={styles.carslist_container}>
        {cars.length > 0 &&
          cars.map((car) => (
            <div className={styles.carlist_row} key={car._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/cars/${car.images[0]}`}
                alt={car.name}
                width="px75"
              />
              <span className="bold">{car.model}</span>
              <div className={styles.actions}>
                {car.available ? (
                  <>
                    {car.buyer && (
                      <button className={styles.conclude_btn}>
                        Concluir venda
                      </button>
                    )}
                    <Link to={`/car/edit/${car._id}`}>Editar</Link>
                    <button>Excluir</button>
                  </>
                ) : (
                  <p>Carro vendido</p>
                )}
              </div>
            </div>
          ))}
        {cars.length === 0 && <p>Você não possui carros cadastrados.</p>}
      </div>
    </section>
  );
};
