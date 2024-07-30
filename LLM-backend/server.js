import express from "express";
const app = express();
//middlewares
app.use(express.json());
//env integeration
import dotenv from "dotenv";
dotenv.config();
//DataBase Connection
import connection from "./dataBase/dbConnection.js";
connection();
// routes
import route from "./routes/userAuthRoutes.js";
app.use("/api/v1", route);
// server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is working at port ${port}`);
});
