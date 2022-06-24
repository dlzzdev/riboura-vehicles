import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFlashMessage } from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";

export const MyCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get("/vehicles/myvehicles").then((response) => {
      setCars(response.data.vehicles);
    });
  }, [token]);

  async function deleteCar(id: string) {
    await api
      .delete(`/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, "success");
        setCars(cars.filter((car) => car._id !== id));
      })
      .catch((err) => {
        setFlashMessage(err.response.data.message, "error");
      });
  }

  async function concludeSale(id: string) {
    await api
      .patch(`/vehicles/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      <div className="pt-6 flex flex-row justify-center text-center p-10">
        <Link
          to="/vehicle/add"
          className="flex justify-center content-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Adicionar veículo
        </Link>
      </div>
      {cars.length > 0 &&
        cars.map((car) => (
          <div className="pt-6 pb-12" key={car._id}>
            <div className="container w-100 lg:w-full mx-auto flex flex-col">
              <div className="flex flex-col text-right md:flex-row overflow-hidden bg-neutral-900 rounded-lg shadow-xl mt-4 w-100 mx-2">
                <div className="h-64 w-auto md:w-1/2">
                  <img
                    className="inset-0 h-full w-full object-cover object-center"
                    src={`${process.env.REACT_APP_API}/images/vehicles/${car.images[0]}`}
                    alt={car.model}
                    key={car._id}
                  />
                </div>
                <div className="w-full py-4 px-6 text-neutral-200 flex flex-col justify-between">
                  <h3 className="font-bold text-xl mb-2">
                    {car.brand} {car.model}
                    <br></br>
                    R$
                    {parseFloat(car.price).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                  {car.available ? (
                    <div className="flex flex-wrap gap-4 justify-end">
                      {car.buyer && (
                        <button
                          className="flex justify-center content-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={() => {
                            concludeSale(car._id);
                          }}
                        >
                          Concluir venda
                        </button>
                      )}
                      <Link
                        to={`/vehicle/edit/${car._id}`}
                        className="flex justify-center content-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Editar
                      </Link>
                      <button
                        className="flex justify-center content-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => {
                          deleteCar(car._id);
                        }}
                      >
                        Excluir anúncio
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 justify-end content-center items-center">
                      <p className="font-semibold">Anúncio finalizado</p>
                      <button
                        className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => {
                          deleteCar(car._id);
                        }}
                      >
                        Excluir anúncio
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};
