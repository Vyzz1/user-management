import express from "express";
import corsHandler from "./config/cors.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(corsHandler);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
