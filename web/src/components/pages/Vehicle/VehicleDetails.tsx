import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFlashMessage } from "../../../hooks/useFlashMessage";

export const CarDetails = () => {
  const [car, setCar] = useState<any>({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/vehicles/${id}`).then((response) => {
      setCar(response.data.vehicle);
    });
  }, [id]);

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  async function schedule() {
    await api
      .patch(`/vehicles/schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFlashMessage(res.data.message, "success");
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  return (
    <>
      {car.brand && (
        <section className="flex flex-col justify-center bg-neutral-900 p-2 rounded-lg">
          <div className="max-w-sm w-full lg:max-w-full">
            <div className="border-b border-gray-400 rounded-b p-4 flex flex-col justify-between leading-normal mb-4">
              <div className="text-neutral-100 font-bold text-xl mb-2 text-center">
                {car.brand} {car.model}
              </div>
              <div className="mb-8 flex flex-wrap items-center text-neutral-200 text-center justify-around">
                <div>
                  <p>
                    Ano: <span className="font-bold">{car.years}</span>
                  </p>
                  <p>
                    Câmbio: <span className="font-bold">{car.shift}</span>
                  </p>
                  <p>
                    Combustível: <span className="font-bold">{car.fuel}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Direção: <span className="font-bold">{car.steering}</span>
                  </p>
                  <p>
                    Potência do motor:{" "}
                    <span className="font-bold">{car.motor_power}</span>
                  </p>
                  <p>
                    Tipo: <span className="font-bold">{car.type}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Cor: <span className="font-bold">{car.color}</span>
                  </p>
                  <p>
                    Quilometragem:{" "}
                    <span className="font-bold">{car.mileage}</span>
                  </p>
                  <p>
                    Preço:{" "}
                    <span className="font-bold">
                      R$
                      {parseFloat(car.price).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <img
                  className="w-10 h-10 rounded-full mb-2"
                  src={
                    car.user.image
                      ? `${process.env.REACT_APP_API}/images/users/${car.user.image}`
                      : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
                  }
                  alt={`${car.user.name} avatar`}
                />
                <div className="text-sm text-neutral-100 font-bold">
                  <p className="leading-none">Anunciante: {car.user.name}</p>
                  <p>Data do anuncio: {convertDate(car.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            {car.images.map((image: any, index: number) => (
              <div
                className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-1"
                key={index}
              >
                <img
                  className="w-full h-full rounded-lg"
                  src={`${process.env.REACT_APP_API}/images/vehicles/${image}`}
                  alt={`Imagem ${index} do carro ${car.model}`}
                />
              </div>
            ))}
          </div>
          {token ? (
            <button
              type="submit"
              className="mt-3 w-full flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={schedule}
            >
              Marcar visita
            </button>
          ) : (
            <p className="text-neutral-200 text-center">
              Você precisa estar{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                conectado
              </Link>{" "}
              a uma conta para agendar uma visita.
            </p>
          )}
        </section>
      )}
    </>
  );
};
