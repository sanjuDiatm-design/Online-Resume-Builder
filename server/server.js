import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
	origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
	credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRouter);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_builder';
mongoose
	.connect(mongoUri)
	.then(() => {
		const port = Number(process.env.PORT) || 5000;
		app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB:', err);
		process.exit(1);
	});

export default app;


