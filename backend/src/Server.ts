import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/Database';
import ProductRoute from "../Routes/ProductRoutes"
import AuthRoute from '../Routes/AuthRoutes'
import CartRoute from "../Routes/CartRoute"
dotenv.config(); // Load environment variables
import cors from "cors";
const app = express();
// Enable CORS
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend requests
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json())
//product
app.use("/api/products", ProductRoute)
//auth
app.use("/api/auth", AuthRoute)
//cart
app.use('/api',CartRoute)

// Root route
app.get("/", (req, res) => {
  res.send("product API is running...");
});
const port = process.env.PORT 

// Connect to the database
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
