import { useState, useEffect } from "react";
import { CheckCircle, WarningCircle } from "phosphor-react";
import bus from "../../utils/bus";

export const Message = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setMessage(message);
      setType(type);
      setVisibility(true);

      setTimeout(() => {
        setVisibility(false);
      }, 5000);
    });
  }, []);

  if (visibility) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return visibility ? (
    <div className="flex mt-4">
      <div className="m-auto right-0">
        <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-1">
              {type === "success" ? (
                <CheckCircle size={24} color="#15803D" />
              ) : (
                <WarningCircle size={24} color="#B91C1C" />
              )}
            </div>
            <div className="ml-2 mr-4">
              {type === "success" ? (
                <span className="block text-green-700">{message}</span>
              ) : (
                <span className="block text-red-700">{message}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
