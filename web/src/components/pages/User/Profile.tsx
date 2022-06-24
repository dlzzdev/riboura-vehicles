import { useState, useEffect } from "react";
import { Input } from "../../form/Input";
import api from "../../../utils/api";
import { useFlashMessage } from "../../../hooks/useFlashMessage";

export const Profile = () => {
  const [user, setUser]: any = useState({
    image: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
    _id: "",
  });
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem("token" || ""));
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get("/users/checkuser").then((res) => {
      setUser(res.data.user);
    });
  }, [token]);

  function onFileChange(e: any) {
    setPreview(e.target.files[0]);
    setUser({
      ...user,
      image: e.target.files[0],
    });
  }
  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let msgText = "";
    let msgType = "";

    const formData = new FormData();
    await Object.keys(user).forEach((key: any) => {
      formData.append(key, user[key]);
    });

    await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        msgText = res.data.message;
        msgType = "success";
      })
      .catch((err) => {
        msgType = "error";
        msgText = err.response.data.message;
      });

    setFlashMessage(msgText, msgType);
  }
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {(user.image || preview) && (
            <img
              className="mx-auto h-48 max-w-xs w-auto shadow rounded-full border-4"
              src={
                preview
                  ? URL.createObjectURL(preview)
                  : `${process.env.REACT_APP_API}/images/users/${user.image}`
              }
              alt={user.name}
            />
          )}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-200">
            Meu perfil
          </h2>
        </div>
        <div className="rounded bg-neutral-900 max-w-md rounded overflow-hidden shadow-xl p-5">
          <form className="space-y-" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid gap-2 text-slate-200">
                <Input
                  type="file"
                  name="image"
                  handleOnChange={onFileChange}
                  placeholder="Foto de perfil (PNG, JPG)"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Digite o seu email"
                  handleOnChange={handleChange}
                  value={user.email || ""}
                />
                <Input
                  type="text"
                  name="name"
                  placeholder="Digite o seu nome"
                  handleOnChange={handleChange}
                  value={user.name || ""}
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Digite o seu telefone"
                  handleOnChange={handleChange}
                  value={user.phone || ""}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Digite a sua senha"
                  handleOnChange={handleChange}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  handleOnChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Editar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
