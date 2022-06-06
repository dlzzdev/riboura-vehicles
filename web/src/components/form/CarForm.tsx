import { useState } from "react";
import { Input } from "./Input";
import formStyles from "./Form.module.css";

export const CarForm = ({ handleSubmit, carData, btnText }: any) => {
  const [car, setCar] = useState(
    carData || {
      brand: "",
      model: "",
      year: "",
      images: "",
      milage: "",
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

  function handleFormSubmit(e: any) {
    e.preventDefault();
    console.log(car);
    handleSubmit(car);
  }

  return (
    <form onSubmit={handleFormSubmit} className={formStyles.form_container}>
      <div className={formStyles.preview_car_images}>
        {preview.length > 0
          ? preview.map((img: any, index: number) => (
              <img
                src={URL.createObjectURL(img)}
                key={`${car.name}+${index}`}
                alt={car.name}
              />
            ))
          : car.images &&
            Array.from(car.images).map((img: any, index: number) => {
              return (
                <img
                  src={`${process.env.REACT_APP_API}/images/cars/${img}`}
                  key={`${car.name}+${index}`}
                  alt={car.name}
                />
              );
            })}
      </div>
      <Input
        text="Fotos do carro"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Modelo"
        type="text"
        name="model"
        handleOnChange={handleChange}
        placeholder="Digite o modelo do carro"
        value={car.model || ""}
      />
      <Input
        text="Marca"
        type="text"
        name="brand"
        handleOnChange={handleChange}
        placeholder="Digite a marca do carro"
        value={car.brand || ""}
      />
      <Input
        text="Ano"
        type="text"
        name="year"
        handleOnChange={handleChange}
        placeholder="Digite o ano de fabricação/modelo do carro"
        value={car.year || ""}
      />
      <Input
        text="Quilometragem"
        type="text"
        name="milage"
        handleOnChange={handleChange}
        placeholder="Digite a quilometragem do carro"
        value={car.milage || ""}
      />
      <Input
        text="Valor"
        type="text"
        name="price"
        handleOnChange={handleChange}
        placeholder="Digite o preço do carro"
        value={car.price || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
};
