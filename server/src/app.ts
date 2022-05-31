import express from "express";
import cors from "cors";
import { connect } from "./db/connect";
import UserRoutes from "./routes/UserRoutes";
import CarRoutes from "./routes/CarRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("../public"));

// Routes
app.use("/users/", UserRoutes);
app.use("/cars/", CarRoutes);

app.listen(3333, async () => {
  await connect();

  console.log("Server started on port 3333!");
});
