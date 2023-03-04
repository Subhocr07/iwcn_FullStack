import express from "express";
import cors from "cors";
import router from "./router.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("connected to backned at " + PORT);
});
