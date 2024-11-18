import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import locationRoutes from './routes/locationRoutes';

// Initialize app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Database connection
connectDB();

// Routes
app.use('/api/location', locationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
