import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home = () => {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    api.get("/vehicles").then((response) => {
      setCars(
        response.data.vehicles.filter((car: any) => car.available === true)
      );
    });
  }, []);

  return (
    <section className="min-h-screen">
      <div className="flex flex-col text-center text-neutral-200">
        <h1 className="text-2xl mt-1 mb-2">Compre o seu carro</h1>
        <p className="text-xl">
          Veja os detalhes de cada carro e marque uma visita.
        </p>
      </div>
      <div className="flex justify-start flex-wrap ">
        {cars.length > 0 &&
          cars.map((car) => (
            <div
              className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4"
              key={car._id}
            >
              <div className="c-card block bg-neutral-900 hover:shadow-md hover:shadow-neutral-900 transition duration-300 rounded-lg overflow-hidden">
                <div className="relative pb-48 overflow-hidden">
                  <div className="absolute inset-0 h-25 w-full mb-5 object-cover">
                    <img
                      className="h-full w-full"
                      src={`${process.env.REACT_APP_API}/images/vehicles/${car.images[0]}`}
                      alt={`Imagem do carro ${car.model}`}
                    />
                  </div>
                </div>
                <div className="p-4 text-neutral-200">
                  <span className="inline-block px-2 py-1 leading-none bg-blue-200 text-blue-800 rounded-lg font-semibold uppercase tracking-wide text-xs">
                    {car.brand}
                  </span>
                  <h2 className="mt-2 mb-2 font-bold">{car.model}</h2>
                  <p className="text-sm">{car.color}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm font-semibold">R$</span>
                    <span className="font-bold text-xl">
                      {parseFloat(car.price).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="p-4 border-t text-xs text-neutral-200 hover:text-white">
                  <span>
                    <Link to={`/vehicle/${car._id}`}>Ver mais detalhes...</Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      {cars.length === 0 && (
        <div className="flex flex-col text-center text-neutral-200">
          <p className="mt-10">
            Não há carros cadastrados ou disponíveis para venda no momento!
          </p>
        </div>
      )}
    </section>
  );
};
