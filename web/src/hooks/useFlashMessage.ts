import bus from "../utils/bus";

export const useFlashMessage = () => {
  function setFlashMessage(message: string, type: string) {
    bus.emit("flash", { message, type });
  }

  return { setFlashMessage };
}
