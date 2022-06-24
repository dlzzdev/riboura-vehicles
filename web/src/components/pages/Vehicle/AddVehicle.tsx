import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../../hooks/useFlashMessage";
import { CarForm } from "../../form/CarForm";

export const AddCar = () => {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function RegisterCar(car: any) {
    let msgType = "success";

    const formData = new FormData();
    await Object.keys(car).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < car[key].length; i++) {
          formData.append(`images`, car[key][i]);
        }
      } else {
        formData.append(key, car[key]);
      }
    });

    await api
      .post("/vehicles/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFlashMessage(response.data.message, msgType);
        navigate("/vehicle/myvehicles");
      })
      .catch((err) => {
        msgType = "error";
        setFlashMessage(err.response.data.message, msgType);
      });
  }

  return (
    <section className="min-h-screen">
      <div className="text-center">
        <p className="text-xl mb-10 mt-2">
          Após este processo o véiculo ficará disponível para venda.
        </p>
      </div>
      <CarForm handleSubmit={RegisterCar} btnText="Cadastrar veículo" />
    </section>
  );
};
