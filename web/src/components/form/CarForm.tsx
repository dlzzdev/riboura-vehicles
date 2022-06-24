import { useState } from "react";
import { Input } from "./Input";
import { Select } from "./Select";

export const CarForm = ({ handleSubmit, carData, btnText }: any) => {
  const caracteristics = {
    brands: [
      "Acura",
      "Alfa Romeo",
      "Aston Martin",
      "Audi",
      "BMW",
      "Cadillac",
      "Chery",
      "Chevrolet",
      "Citroën",
      "Dodge",
      "Ferrari",
      "Fiat",
      "Ford",
      "Honda",
      "Hyundai",
      "Iveco",
      "Jaguar",
      "Jeep",
      "Kia Motors",
      "Lamborghini",
      "Land Rover",
      "Lexus",
      "Maserati",
      "Mazda",
      "Mclaren",
      "Mercedes-Benz",
      "Mitsubishi",
      "Nissan",
      "Peugeot",
      "Porsche",
      "RAM",
      "Renault",
      "Rolls-Royce",
      "Subaru",
      "Suzuki",
      "Toyota",
      "Volkswagen",
      "Volvo",
    ],
    colors: [
      "Branco",
      "Preto",
      "Prata",
      "Cinza",
      "Vermelho",
      "Azul",
      "Verde",
      "Amarelo",
      "Laranja",
      "Outros",
    ],
    types: [
      "Hatch",
      "Sedã",
      "SUV",
      "Van/Utilitário",
      "Conversível",
      "Pick-up",
      "Antigo",
      "Buggy",
      "Passeio",
    ],
    powers: [
      "1.0 - 1.5",
      "1.6 - 1.9",
      "2.0 - 2.4",
      "2.5 - 2.9",
      "3.0 - 3.4",
      "3.5 - 3.9",
      "+ 4.0",
    ],
    fuels: [
      "Gasolina",
      "Etanol",
      "Diesel",
      "Gás",
      "Flex",
      "Híbrido",
      "Elétrico",
    ],
  };

  const [car, setCar] = useState(
    carData || {
      brand: "",
      model: "",
      years: "",
      shift: "",
      fuel: "",
      steering: "",
      motor_power: "",
      type: "",
      mileage: "",
      color: "",
      images: "",
      price: "",
    }
  );
  const [preview, setPreview] = useState([]);

  function onFileChange(e: any) {
    setPreview(Array.from(e.target.files));
    setCar({ ...car, images: e.target.files });
  }

  function handleChange(e: any) {
    setCar({ ...car, [e.target.name]: e.target.value });
  }

  function handleSelect(e: any) {
    let value = e.target.options[e.target.selectedIndex].text;
    if (value.includes("Selecione")) value = "Não informado";

    setCar({
      ...car,
      [e.target.name]: value,
    });
    console.log(car);
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    handleSubmit(car);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full text-neutral-100 bg-neutral-900 rounded-lg p-4"
      autoComplete="off"
    >
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3">
          <Select
            name="brand"
            text="Marca"
            options={caracteristics.brands}
            handleOnChange={handleSelect}
            value={car.brand || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mt-0 md:mt-6">
          <Input
            type="text"
            name="model"
            handleOnChange={handleChange}
            placeholder="Modelo do carro"
            value={car.model || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mt-0 md:mt-6">
          <Input
            type="text"
            name="years"
            pattern="\d{4}/\d{4}"
            handleOnChange={handleChange}
            placeholder="Ano de fabricação/modelo (YYYY/YYYY)"
            value={car.years || ""}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <Select
            name="shift"
            text="Câmbio"
            options={["Manual", "Automática", "Semi-Automático"]}
            handleOnChange={handleSelect}
            value={car.shift || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <Select
            name="fuel"
            text="Combustível"
            options={caracteristics.fuels}
            handleOnChange={handleSelect}
            value={car.fuel || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <Select
            name="steering"
            text="Direção"
            options={["Hidráulica", "Eléctrica", "Mecánica", "Assistida"]}
            handleOnChange={handleSelect}
            value={car.steering || ""}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <Select
            name="motor_power"
            text="Potência do motor"
            options={caracteristics.powers}
            handleOnChange={handleSelect}
            value={car.motor_power || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <Select
            name="type"
            text="Tipo de veículo"
            options={caracteristics.types}
            handleOnChange={handleSelect}
            value={car.type || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <Select
            name="color"
            text="Cor do veículo"
            options={caracteristics.colors}
            handleOnChange={handleSelect}
            value={car.color || ""}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/3 px-3 mt-1">
          <Input
            type="text"
            name="mileage"
            handleOnChange={handleChange}
            placeholder="Quilometragem do veículo"
            value={car.mileage || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mt-1">
          <Input
            type="text"
            name="price"
            handleOnChange={handleChange}
            placeholder="Preço do véiculo (R$)"
            value={car.price || ""}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 -mt-2">
          <Input
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
            placeholder="Imagens do veículo (PNG, JPG)"
          />
        </div>
      </div>
      <div className="flex justify-start flex-wrap ">
        {preview.length > 0
          ? preview.map((img: any, index: number) => (
              <div
                className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-1"
                key={index}
              >
                <div className="relative pb-48 overflow-hidden">
                  <div className="absolute inset-0 h-25 w-full mb-2 object-cover">
                    <img
                      className="h-full w-full shadow-lg rounded-lg"
                      src={URL.createObjectURL(img)}
                      alt={`Imagem do carro ${car.model}`}
                    />
                    {index === 0 && (
                      <div className="absolute top-0 left-0 m-1">
                        <h4 className="mb-3 text-md rounded-lg font-light tracking-tight text-neutral-200 bg-gray-400/50 px-2">
                          Foto principal
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          : car.images &&
            Array.from(car.images).map((img: any, index: number) => {
              return (
                <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
                  <div className="relative pb-48 overflow-hidden">
                    <div className="absolute inset-0 h-25 w-full mb-5 object-cover">
                      <img
                        className="h-full w-full"
                        src={`${process.env.REACT_APP_API}/images/vehicles/${img}`}
                        key={`${car.model}+${index}`}
                        alt={`Imagem do carro ${car.model}`}
                      />
                      {index === 0 && (
                        <div className="absolute top-0 left-0 m-1">
                          <h4 className="mb-3 text-md rounded-lg font-light tracking-tight text-neutral-200 bg-gray-400/50 px-2">
                            Foto principal
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <input
        type="submit"
        className="group relative w-full flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        value={btnText}
      />
    </form>
  );
};
