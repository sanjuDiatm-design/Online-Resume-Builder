import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import auth from '../utils/authMiddleware.js';

const router = Router();

const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ error: 'Name, email and password are required.' });
		}

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(409).json({ error: 'Email already in use.' });
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const user = await User.create({ name, email, passwordHash });
		return res.status(201).json({ message: 'Signup successful', user: { id: user.id, name: user.name, email: user.email } });
	} catch (err) {
		console.error('Signup error:', err);
		return res.status(500).json({ error: 'Server error' });
	}
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required.' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials.' });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ error: 'Invalid credentials.' });
		}

		const token = jwt.sign({ sub: user.id, roles: user.roles }, jwtSecret, { expiresIn: jwtExpiresIn });
		return res.json({ token, user: { id: user.id, name: user.name, email: user.email, roles: user.roles } });
	} catch (err) {
		console.error('Login error:', err);
		return res.status(500).json({ error: 'Server error' });
	}
});

// GET /api/auth/me (protected)
router.get('/me', auth(), async (req, res) => {
	const user = await User.findById(req.userId).select('name email roles');
	if (!user) return res.status(404).json({ error: 'User not found' });
	return res.json({ user });
});

// GET /api/auth/admin-only (authorization example)
router.get('/admin-only', auth(['admin']), async (_req, res) => {
	return res.json({ message: 'Welcome, admin!' });
});

export default router;


