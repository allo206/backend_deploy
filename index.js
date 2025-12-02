import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: [
    "https://frontend-deploy-gilt.vercel.app",
    "https://frontend-deploy-git-main-allos-projects-878920fa.vercel.app",
    "https://frontend-deploy-q2eh2i1hg-allos-projects-878920fa.vercel.app"
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// ROOT ROUTE (⚡ এটি না থাকলে Render deploy fail দেয়)
app.get("/", (req, res) => {
  res.send("Backend Running Successfully!");
});

const PORT = process.env.PORT || 3000;

// Database connect (⚡ listen এর বাইরে হবে)
connectDB();

// apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
