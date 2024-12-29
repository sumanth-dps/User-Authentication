import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = process.env.ALLOWED_ORIGIN;
app.use(express.json());
app.use(cookieParser());
//app.use(function (req, res, next) {
// res.setHeader(
//   "Access-Control-Allow-Headers",
//   "X-Requested-With,content-type, Accept,Authorization,Origin"
// );
// res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader(
//   "Access-Control-Allow-Methods",
//   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
// );
// res.setHeader("Access-Control-Allow-Credentials", true);
//next();
//});
// app.use(cors());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API Working"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server started on PORT : ${port}`);
});
