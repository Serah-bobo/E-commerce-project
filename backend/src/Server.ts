import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/Database';
import ProductRoute from "../Routes/ProductRoutes";
import AuthRoute from '../Routes/AuthRoutes';
import CartRoute from "../Routes/CartRoute";
import path from "path";




dotenv.config(); // Load environment variables

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Serve images
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Make the uploads directory accessible
app.use('/uploads', express.static('uploads'));
// Enable CORS

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PATCH,DELETE",
  credentials: true
}));

// Middleware for parsing JSON & URL Encoded Data
app.use(express.json());


// Routes
app.use("/api/products", ProductRoute);
app.use("/api/auth", AuthRoute);
app.use('/api', CartRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Product API is running...");
});

const port = process.env.PORT;
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
