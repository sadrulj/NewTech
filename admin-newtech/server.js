import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productsRoute from "./routes/productsRoute.js"
import cors from "cors"
//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

//middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productsRoute)

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to New Tech App Project </h1>")
})

//PORT
const PORT = process.env.PORT || 8080;

//run Listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}`);
})