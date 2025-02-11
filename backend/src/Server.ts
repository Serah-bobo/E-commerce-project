import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/Database';
import ProductRoute from "../Routes/ProductRoutes"
import AuthRoute from '../Routes/AuthRoutes'
dotenv.config(); // Load environment variables

const app = express();
app.use(express.json())

app.use("/api/products", ProductRoute)
app.use("/api/auth", AuthRoute)

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
