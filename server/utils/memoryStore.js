import crypto from 'crypto';

// In-memory fallback store used whenever MongoDB is not yet connected
class MemoryStore {
  constructor() {
    this.users = new Map();
    this.resumes = new Map();
  }

  // --- User Operations ---
  findUserByEmail(email) {
    if (!email) return null;
    return this.users.get(email.toLowerCase()) || null;
  }

  findUserById(id) {
    for (const user of this.users.values()) {
      if (user.id === id) return user;
    }
    return null;
  }

  createUser({ name, email, passwordHash }) {
    const id = 'mem_' + crypto.randomUUID();
    const newUser = {
      id,
      name,
      email: email.toLowerCase(),
      passwordHash,
      roles: ['user'],
      createdAt: new Date(),
    };
    this.users.set(email.toLowerCase(), newUser);
    return newUser;
  }

  // --- Resume Operations ---
  findResumesByUserId(userId) {
    const list = [];
    for (const resume of this.resumes.values()) {
      if (resume.userId === userId) {
        list.push(resume);
      }
    }
    return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  findResumeByIdAndUser(id, userId) {
    const resume = this.resumes.get(id);
    if (resume && resume.userId === userId) {
      return resume;
    }
    return null;
  }

  createResume(data) {
    const _id = 'mem_res_' + crypto.randomUUID();
    const now = new Date();
    const newResume = {
      _id,
      title: data.title || 'My Professional Resume',
      templateId: data.templateId || 'template-one',
      themeColor: data.themeColor || '#2563eb',
      fontFamily: data.fontFamily || 'Inter, sans-serif',
      personalInfo: data.personalInfo || {},
      summary: data.summary || '',
      experience: data.experience || [],
      education: data.education || [],
      projects: data.projects || [],
      skills: data.skills || [],
      certifications: data.certifications || [],
      userId: data.userId,
      createdAt: now,
      updatedAt: now,
    };
    this.resumes.set(_id, newResume);
    return newResume;
  }

  updateResume(id, userId, data) {
    const existing = this.findResumeByIdAndUser(id, userId);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      _id: id,
      userId,
      updatedAt: new Date(),
    };
    this.resumes.set(id, updated);
    return updated;
  }

  deleteResume(id, userId) {
    const existing = this.findResumeByIdAndUser(id, userId);
    if (!existing) return false;
    this.resumes.delete(id);
    return true;
  }
}

export const memoryStore = new MemoryStore();

