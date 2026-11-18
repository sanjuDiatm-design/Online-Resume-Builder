import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Resume from './models/Resume.js';

dotenv.config({ path: './server/.env' });

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_builder';

async function showDatabase() {
  console.log('Connecting to:', mongoUri);
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to MongoDB successfully!\n');

    console.log('--- 👤 USERS COLLECTION ---');
    const users = await User.find().select('name email roles createdAt');
    if (users.length === 0) {
      console.log('No users found in database yet.\n');
    } else {
      console.table(
        users.map((u) => ({
          ID: u._id.toString(),
          Name: u.name,
          Email: u.email,
          Created: new Date(u.createdAt).toLocaleString(),
        }))
      );
      console.log();
    }

    console.log('--- 📄 RESUMES COLLECTION ---');
    const resumes = await Resume.find().select('title templateId themeColor userId updatedAt');
    if (resumes.length === 0) {
      console.log('No resumes found in database yet.\n');
    } else {
      console.table(
        resumes.map((r) => ({
          ID: r._id.toString(),
          Title: r.title,
          Template: r.templateId,
          Theme: r.themeColor,
          Updated: new Date(r.updatedAt).toLocaleString(),
        }))
      );
      console.log();
    }
  } catch (err) {
    console.error('Could not connect to MongoDB:', err.message);
    console.log('Make sure MongoDB is running or check your MONGO_URI in server/.env.');
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

showDatabase();

