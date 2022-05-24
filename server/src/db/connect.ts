import moongose from "mongoose";
import 'dotenv/config'

export async function connect() {
  try {
    await moongose.connect(process.env.MONGO_URL!);
    console.log("Database connected!");
  } catch (e) {
    console.log(`Error connecting to database: ${e}`);
  }
}
