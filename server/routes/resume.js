import { Router } from 'express';
import mongoose from 'mongoose';
import Resume from '../models/Resume.js';
import { memoryStore } from '../utils/memoryStore.js';
import auth from '../utils/authMiddleware.js';

const router = Router();
const isDbConnected = () => mongoose.connection.readyState === 1;

// All resume routes require authentication
router.use(auth());

// GET /api/resumes - Get all resumes for current user
router.get('/', async (req, res) => {
	try {
		if (isDbConnected()) {
			const resumes = await Resume.find({ userId: req.userId }).sort({ updatedAt: -1 });
			return res.json({ resumes });
		} else {
			const resumes = memoryStore.findResumesByUserId(req.userId);
			return res.json({ resumes });
		}
	} catch (err) {
		console.error('Fetch resumes error:', err);
		return res.status(500).json({ error: 'Failed to fetch resumes.' });
	}
});

// GET /api/resumes/:id - Get specific resume
router.get('/:id', async (req, res) => {
	try {
		if (isDbConnected()) {
			const resume = await Resume.findOne({ _id: req.params.id, userId: req.userId });
			if (resume) {
				return res.json({ resume });
			}
		}
		const resume = memoryStore.findResumeByIdAndUser(req.params.id, req.userId);
		if (!resume) {
			return res.status(404).json({ error: 'Resume not found.' });
		}
		return res.json({ resume });
	} catch (err) {
		console.error('Fetch resume error:', err);
		return res.status(500).json({ error: 'Failed to fetch resume.' });
	}
});

// POST /api/resumes - Create new resume
router.post('/', async (req, res) => {
	try {
		const data = { ...req.body, userId: req.userId };
		if (isDbConnected()) {
			const resume = await Resume.create(data);
			return res.status(201).json({ message: 'Resume created successfully.', resume });
		} else {
			const resume = memoryStore.createResume(data);
			return res.status(201).json({ message: 'Resume created successfully.', resume });
		}
	} catch (err) {
		console.error('Create resume error:', err);
		return res.status(500).json({ error: 'Failed to create resume.' });
	}
});

// PUT /api/resumes/:id - Update existing resume
router.put('/:id', async (req, res) => {
	try {
		const updateData = { ...req.body };
		delete updateData.userId;

		if (isDbConnected()) {
			const resume = await Resume.findOneAndUpdate(
				{ _id: req.params.id, userId: req.userId },
				{ $set: updateData },
				{ new: true, runValidators: true }
			);
			if (resume) {
				return res.json({ message: 'Resume updated successfully.', resume });
			}
		}

		const updated = memoryStore.updateResume(req.params.id, req.userId, updateData);
		if (!updated) {
			return res.status(404).json({ error: 'Resume not found or unauthorized.' });
		}
		return res.json({ message: 'Resume updated successfully.', resume: updated });
	} catch (err) {
		console.error('Update resume error:', err);
		return res.status(500).json({ error: 'Failed to update resume.' });
	}
});

// DELETE /api/resumes/:id - Delete resume
router.delete('/:id', async (req, res) => {
	try {
		if (isDbConnected()) {
			const result = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });
			if (result) {
				return res.json({ message: 'Resume deleted successfully.' });
			}
		}
		const deleted = memoryStore.deleteResume(req.params.id, req.userId);
		if (!deleted) {
			return res.status(404).json({ error: 'Resume not found or unauthorized.' });
		}
		return res.json({ message: 'Resume deleted successfully.' });
	} catch (err) {
		console.error('Delete resume error:', err);
		return res.status(500).json({ error: 'Failed to delete resume.' });
	}
});

export default router;
