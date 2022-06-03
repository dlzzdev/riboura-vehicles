import bus from "../utils/bus";

export default function UseFlashMessage() {
  function SetFlashMessage(message: string, type: string) {
    bus.emit("flash", { message, type });
  }

  return { SetFlashMessage };
}
