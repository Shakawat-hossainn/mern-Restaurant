import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cookieParser from 'cookie-parser';
import cartRoutes from './routes/cart.route.js';
import deliveryRoutes from './routes/delivery.route.js';
import cors from 'cors';
import path from 'path'
const __dirname = path.resolve();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static('uploads'));

app.use(cors())

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use(express.static(path.join(__dirname, '/Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
});
// Error handling middleware
app.use((err, req, res, next) => {
    const message = err.message || 'Internal server error';
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
