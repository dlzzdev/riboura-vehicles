import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("../public"));

app.listen(3333, () => {
  console.log("Server started on port 3333!");
});
