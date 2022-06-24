import api from "../../../utils/api";
import { useState, useEffect } from "react";

export const MyPurchases = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get("/vehicles/mypurchases").then((response) => {
      setCars(response.data.vehicles);
    });
  }, [token]);

  return (
    <section className="flex flex-col justify-center">
      <div className="pt-6 pb-12">
        {cars.length > 0 &&
          cars.map((car: any) => (
            <div
              className="container w-100 lg:w-full mx-auto flex flex-col"
              key={car._id}
            >
              <div className="flex flex-col md:flex-row overflow-hidden bg-neutral-900 rounded-lg shadow-xl mt-4 w-100 mx-2">
                <div className="h-64 w-auto md:w-1/2">
                  <img
                    className="inset-0 h-full w-full object-cover object-center"
                    src={`${process.env.REACT_APP_API}/images/vehicles/${car.images[0]}`}
                    alt={`img ${car.model}`}
                  />
                </div>
                <div className="w-full text-neutral-200 flex flex-col justify-center text-center p-4">
                  {car.available ? (
                    <>
                      <p className="text-lg font-semibold">
                        Entre em contato com o anunciante:
                      </p>
                      <p>{car.user.name}</p>
                      <p>{car.user.phone}</p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold">Anúncio finalizado</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        {cars.length === 0 && (
          <p className="text-lg font-semibold text-center text-neutral-200">
            Você ainda não agendou uma visita a um veículo.
          </p>
        )}
      </div>
    </section>
  );
};
