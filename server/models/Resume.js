import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		title: {
			type: String,
			default: 'My Professional Resume',
			trim: true,
		},
		templateId: {
			type: String,
			default: 'template-one',
		},
		themeColor: {
			type: String,
			default: '#2563eb',
		},
		fontFamily: {
			type: String,
			default: 'Inter, sans-serif',
		},
		personalInfo: {
			fullName: { type: String, default: '' },
			jobTitle: { type: String, default: '' },
			email: { type: String, default: '' },
			phone: { type: String, default: '' },
			address: { type: String, default: '' },
			website: { type: String, default: '' },
			linkedin: { type: String, default: '' },
			github: { type: String, default: '' },
		},
		summary: {
			type: String,
			default: '',
		},
		experience: [
			{
				company: { type: String, default: '' },
				role: { type: String, default: '' },
				location: { type: String, default: '' },
				startDate: { type: String, default: '' },
				endDate: { type: String, default: '' },
				current: { type: Boolean, default: false },
				description: { type: String, default: '' },
			},
		],
		education: [
			{
				school: { type: String, default: '' },
				degree: { type: String, default: '' },
				fieldOfStudy: { type: String, default: '' },
				location: { type: String, default: '' },
				startDate: { type: String, default: '' },
				endDate: { type: String, default: '' },
				grade: { type: String, default: '' },
			},
		],
		projects: [
			{
				title: { type: String, default: '' },
				description: { type: String, default: '' },
				link: { type: String, default: '' },
				techStack: { type: String, default: '' },
			},
		],
		skills: {
			type: [String],
			default: [],
		},
		certifications: [
			{
				name: { type: String, default: '' },
				issuer: { type: String, default: '' },
				date: { type: String, default: '' },
			},
		],
	},
	{ timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;

