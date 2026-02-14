import express from "express";
import itemsRouter from "./routes/itemsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import reviewRouter from "./routes/reviewsRoutes.js";
import morgan from "morgan";
import AppError from "./utils/AppError.js";
import golobalErrorHandler from "./controllers/errorController.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import path from "path";
import { fileURLToPath } from "url";
// import qs from "qs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.set("query parser", "extended");
// app.use(mongoSanitize());
// app.set("query parser", (str) => qs.parse(str));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many requests from this ip ,please try again later in  an hour",
});
app.use("/api", limiter);
app.use(express.static(`${__dirname}/public`));

app.use(hpp());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use((req, res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404));
});
app.use(golobalErrorHandler);
export default app;
