import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { RoundedImage } from "../../layout/RoundedImage";
import styles from "./Dashboard.module.css";

export const MyPurchases = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/cars/mypurchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCars(res.data.cars);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.carlist_header}>
        <h1>Minhas compras</h1>
      </div>
      <div className={styles.carlist_container}>
        {cars.length > 0 &&
          cars.map((car: any, index: number) => (
            <div className={styles.carlist_row} key={car._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/cars/${car.images[0]}`}
                alt={car.name}
                width="px75"
              />
              <span className="bold">{car.model}</span>
              <div>
                <p className={styles.contacts}>
                  Contate o vendedor para mais informações: <br />
                  Ligue para: <span className="bold">{car.user.name}</span> Celular: <span className="bold">{car.user.phone}</span>
                </p>
              </div>
              <div className={styles.actions}>
                {car.available ? (
                  <p>Compra em processo</p>
                ) : (
                  <p>Parabéns por concluir a compra.</p>
                )}
              </div>
            </div>
          ))}
        {cars.length === 0 && (
          <p>Você não possui nenhuma visita/compra no momento.</p>
        )}
      </div>
    </section>
  );
};
