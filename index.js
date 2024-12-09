import express, { urlencoded } from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;
const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie middleare (To store cookies coming in request sent via browser)
app.use(cookieParser());

// Custom(Sign Up) Route
// import userRouter from './routes/userRoutes';
import postRouter from './routes/post.js';
import userRouter from './routes/route.js';

app.use("/api", userRouter);
app.use("/api", postRouter);

app.get("/", (req, res) => {
  res.send("Hey, Anshuman from Express");
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}...`);
});
