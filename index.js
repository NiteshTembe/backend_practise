
import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
//console.log(process.env.MONGO_URL);
const MONGO_URL = process.env.MONGO_URL;

//Mongo connection
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is Connected");
  return client;
}

export const client = await createConnection();

//interceptor |  converting body to json
app.use(express.json());

//REST API Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to Movie API");
});

app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log("Server started on the port", PORT));
