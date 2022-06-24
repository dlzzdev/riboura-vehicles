import express from "express";
import cors from "cors";
import { connect } from "./db/connect";
import UserRoutes from "./routes/UserRoutes";
import VehiclesRoutes from "./routes/VehiclesRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.static("public"));

// Routes
app.use("/users", UserRoutes);
app.use("/vehicles", VehiclesRoutes);

app.listen(process.env.PORT || 3333, async () => {
  await connect();

  console.log(`Server started on port ${process.env.PORT || 3333}`);
});
