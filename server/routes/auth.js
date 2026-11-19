import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB } from '../server.js';
import { memoryStore } from '../utils/memoryStore.js';
import auth from '../utils/authMiddleware.js';

const router = Router();

const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

const isDbConnected = () => mongoose.connection.readyState === 1;

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ error: 'Name, email and password are required.' });
		}

		const cleanEmail = email.toLowerCase().trim();
		const cleanName = name.trim();

		// Attempt to connect if disconnected
		if (!isDbConnected() && process.env.MONGO_URI) {
			await connectDB();
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		if (isDbConnected()) {
			const existing = await User.findOne({ email: cleanEmail });
			if (existing) {
				return res.status(409).json({ error: 'Email already in use. Please log in instead.' });
			}
			const user = await User.create({ name: cleanName, email: cleanEmail, passwordHash });
			const token = jwt.sign({ sub: user.id, roles: user.roles }, jwtSecret, { expiresIn: jwtExpiresIn });
			return res.status(201).json({
				message: 'Signup successful',
				token,
				user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
			});
		} else if (process.env.VERCEL) {
			// On Vercel, memory store is ephemeral and will lose data across lambda instances
			return res.status(503).json({
				error: 'Database connection failed. Please ensure MongoDB Atlas Network Access is set to 0.0.0.0/0 (Allow access from anywhere).',
			});
		} else {
			// Local development fallback memory store
			const existing = memoryStore.findUserByEmail(cleanEmail);
			if (existing) {
				return res.status(409).json({ error: 'Email already in use. Please log in instead.' });
			}
			const user = memoryStore.createUser({ name: cleanName, email: cleanEmail, passwordHash });
			const token = jwt.sign({ sub: user.id, roles: user.roles }, jwtSecret, { expiresIn: jwtExpiresIn });
			return res.status(201).json({
				message: 'Signup successful (Local memory mode)',
				token,
				user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
			});
		}
	} catch (err) {
		console.error('Signup error:', err);
		return res.status(500).json({ error: 'Server error during signup.' });
	}
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required.' });
		}

		const cleanEmail = email.toLowerCase().trim();

		// Attempt to connect if disconnected
		if (!isDbConnected() && process.env.MONGO_URI) {
			await connectDB();
		}

		if (isDbConnected()) {
			const user = await User.findOne({ email: cleanEmail });
			if (!user) {
				return res.status(401).json({ error: 'Invalid email or password.' });
			}
			const isMatch = await user.comparePassword(password);
			if (!isMatch) {
				return res.status(401).json({ error: 'Invalid email or password.' });
			}
			const token = jwt.sign({ sub: user.id, roles: user.roles }, jwtSecret, { expiresIn: jwtExpiresIn });
			return res.json({
				message: 'Login successful',
				token,
				user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
			});
		} else if (process.env.VERCEL) {
			return res.status(503).json({
				error: 'Database connection failed. Please ensure MongoDB Atlas Network Access is set to 0.0.0.0/0 (Allow access from anywhere).',
			});
		} else {
			// Local development fallback memory store
			const user = memoryStore.findUserByEmail(cleanEmail);
			if (!user) {
				return res.status(401).json({ error: 'Invalid email or password.' });
			}
			const isMatch = await bcrypt.compare(password, user.passwordHash);
			if (!isMatch) {
				return res.status(401).json({ error: 'Invalid email or password.' });
			}
			const token = jwt.sign({ sub: user.id, roles: user.roles }, jwtSecret, { expiresIn: jwtExpiresIn });
			return res.json({
				message: 'Login successful',
				token,
				user: { id: user.id, name: user.name, email: user.email, roles: user.roles },
			});
		}
	} catch (err) {
		console.error('Login error:', err);
		return res.status(500).json({ error: 'Server error during login.' });
	}
});

// GET /api/auth/me (protected)
router.get('/me', auth(), async (req, res) => {
	try {
		if (!isDbConnected() && process.env.MONGO_URI) {
			await connectDB();
		}

		if (isDbConnected()) {
			const user = await User.findById(req.userId).select('name email roles');
			if (user) {
				return res.json({ user: { id: user.id, name: user.name, email: user.email, roles: user.roles } });
			}
		}
		const user = memoryStore.findUserById(req.userId);
		if (user) {
			return res.json({ user: { id: user.id, name: user.name, email: user.email, roles: user.roles } });
		}
		return res.status(404).json({ error: 'User not found' });
	} catch (err) {
		console.error('Auth verification error:', err);
		return res.status(500).json({ error: 'Server error' });
	}
});

// GET /api/auth/admin-only (authorization example)
router.get('/admin-only', auth(['admin']), async (_req, res) => {
	return res.json({ message: 'Welcome, admin!' });
});

export default router;
