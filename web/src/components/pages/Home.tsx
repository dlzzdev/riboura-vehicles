import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";

export const Home = () => {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    api.get("/cars").then((response) => {
      setCars(response.data.cars);
    });
  }, []);

  return (
    <section>
      <div className={styles.car_home_header}>
        <h1>Compre o seu carro</h1>
        <p>Veja os detalhes de cada carro e marque uma visita.</p>
      </div>
      <div className={styles.car_container}>
        {cars.length > 0 &&
          cars.map((car) => (
            <div className={styles.car_card}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/cars/${car.images[0]})`,
                }}
                className={styles.car_card_image}
              ></div>
              <h3>{car.model}</h3>
              <p>
                <span className="bold">Marca:</span> {car.brand}
              </p>
              {car.available ? (
                <Link to={`/car/${car._id}`}>Mais detalhes</Link>
              ) : (
                <button disabled>Veículo indisponivel</button>
              )}
            </div>
          ))}
        {cars.length === 0 && (
          <p>Não há carros cadastrados ou disponíveis para venda no momento!</p>
        )}
      </div>
    </section>
  );
};
