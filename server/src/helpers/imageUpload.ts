import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("cars")) {
      folder = "cars";
    }
    cb(null, `public/images/${folder}`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 100)) +
        path.extname(file.originalname)
    );
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Por favor, envie uma imagem válida."));
    }
    cb(null, true);
  },
});
