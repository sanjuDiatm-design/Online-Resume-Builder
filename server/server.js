import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import resumeRouter from './routes/resume.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN
	? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
	: ['http://localhost:5173'];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
				return callback(null, true);
			}
			return callback(null, true);
		},
		credentials: true,
	})
);
app.use(express.json({ limit: '10mb' }));

// Cached MongoDB Connection for Serverless & Standalone
let isConnected = false;
let isConnecting = false;

export async function connectDB() {
	if (mongoose.connection.readyState >= 1) {
		isConnected = true;
		return;
	}
	if (isConnecting) return;

	isConnecting = true;
	const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_builder';
	try {
		await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
		isConnected = true;
		console.log('✅ Connected to MongoDB successfully.');
	} catch (err) {
		console.warn('⚠️ Could not connect to MongoDB:', err.message);
	} finally {
		isConnecting = false;
	}
}

// Auto-connect middleware for serverless invocations
app.use(async (_req, _res, next) => {
	if (mongoose.connection.readyState === 0 && process.env.MONGO_URI) {
		await connectDB();
	}
	next();
});

// Health check
app.get('/health', (_req, res) => {
	const dbState = mongoose.connection.readyState;
	const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
	res.json({
		status: 'ok',
		timestamp: new Date().toISOString(),
		database: states[dbState] || 'unknown',
	});
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/resumes', resumeRouter);

// Start server locally (Only when not running as Vercel Serverless Function)
if (!process.env.VERCEL) {
	const port = Number(process.env.PORT) || 5000;
	app.listen(port, () => {
		console.log(`🚀 ResumeHub API running on http://localhost:${port}`);
	});
	connectDB();
}

export default app;
