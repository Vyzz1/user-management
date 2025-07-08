import express from "express";
import corsHandler from "./config/cors.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(corsHandler);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
});
