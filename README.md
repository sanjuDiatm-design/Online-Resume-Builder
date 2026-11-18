# 📄 ResumeHub – Full-Stack Online Resume Builder

A modern, production-ready, full-stack web application to create, customize, preview, and export professional resumes. Built with a React 19 frontend and a Node.js / Express 5 backend with MongoDB.

---

## ✨ Features

### 🎨 Resume Builder & Customization
- **4 Distinct Resume Templates**:
  - **Modern Clean**: Elegant single-column layout with refined section borders and hierarchy.
  - **Executive Sidebar**: Two-column layout with contrasting colored sidebar for profile, skills, and education.
  - **Tech Accent**: Timeline-based layout with colored accent markers, modern project cards, and tech stack tags.
  - **Minimal ATS**: Clean, high-contrast layout optimized for Applicant Tracking Systems.
- **Dynamic Multi-Item Sections**:
  - Add, edit, and remove multiple **Work Experiences** (role, company, location, dates, bulleted responsibilities).
  - Add, edit, and remove multiple **Education Degrees** (school, degree, major, honors/GPA).
  - Add, edit, and remove multiple **Featured Projects** (title, link, tech stack, description).
  - Add, edit, and remove **Certifications** (credential name, issuing authority, year).
  - Interactive **Skills Chip Manager**: Add skills via Enter or comma with 1-click removal pills.
  - Social & Professional Links: LinkedIn, GitHub, Portfolio website, phone, email, and location.
- **Real-Time Customization**:
  - **Color Palette Switcher**: Instant theme colors (Royal Blue, Emerald Green, Slate, Deep Purple, Crimson Red, Amber Orange).
  - **1-Click Demo Data Loader**: Populate realistic developer resume data to test any template instantly.
  - **Clear Data**: Start with a fresh blank canvas.

### 📥 Export & Print
- **High-Resolution PDF Download**: Uses `html2canvas` + `jsPDF` for clean client-side rendering.
- **Microsoft Word (DOCX) Export**: Native `.docx` document generation via `docx`.
- **Browser Print Optimization**: Built-in `@media print` stylesheets that isolate the A4 resume paper and remove web toolbars.

### 🔐 User Accounts & Cloud Sync
- **JWT Authentication**: User registration, login, and token-based session persistence.
- **My Resumes Dashboard** (`/dashboard`):
  - View all saved resumes with last-modified timestamps and template badges.
  - Open, edit, or delete resumes.
  - Offline / guest draft support via `localStorage` when not signed in.

---

## 🧱 Architecture & Tech Stack

```text
root
├── public/                 # Static assets (images, template thumbnails)
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx      # Navigation bar with auth status & avatar
│   │   ├── HeroSection.jsx # Landing page hero banner
│   │   ├── DeliverBest.jsx # Feature showcase
│   │   ├── Templates.jsx   # Template catalog
│   │   ├── ResumeBuilder.jsx # Core dual-pane editor & live A4 preview
│   │   ├── Dashboard.jsx   # "My Resumes" user dashboard
│   │   ├── Login.jsx       # User login
│   │   ├── Signup.jsx      # User registration
│   │   ├── About.jsx       # About us page
│   │   ├── Contact.jsx     # Contact form
│   │   └── Footer.jsx      # Footer
│   ├── context/
│   │   └── AuthContext.jsx # Global user auth context & session sync
│   ├── StyleSheets/        # CSS styling per component
│   ├── App.jsx             # React Router setup
│   └── main.jsx            # Application entry
├── server/
│   ├── models/
│   │   ├── User.js         # Mongoose User schema & password hashing
│   │   └── Resume.js       # Mongoose Resume schema (experiences, projects, etc.)
│   ├── routes/
│   │   ├── auth.js         # Signup, login, and verify routes
│   │   └── resume.js       # CRUD routes for user resumes
│   ├── utils/
│   │   └── authMiddleware.js # JWT verification middleware
│   ├── .env                # Server configuration (MongoDB URI, JWT Secret, Port)
│   └── server.js           # Express app entry & database connection
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database & Environment
Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_builder
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```
*(You can use a local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) cloud cluster URI).*

### 3. Start the Backend API
```bash
npm run server:dev
```
* Backend runs on: `http://localhost:5000`
* Health check: `http://localhost:5000/health`

### 4. Start the Frontend
In another terminal:
```bash
npm run dev
```
* Frontend runs on: `http://localhost:5173`

---

## 📡 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register new user account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Log in and receive JWT token (`email`, `password`) |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile (Bearer Token) |

### Resumes (`/api/resumes`)
*All resume endpoints require `Authorization: Bearer <TOKEN>` header.*

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/resumes` | Fetch all saved resumes for the authenticated user |
| `GET` | `/api/resumes/:id` | Fetch a single resume by ID |
| `POST` | `/api/resumes` | Create and save a new resume |
| `PUT` | `/api/resumes/:id` | Update an existing resume |
| `DELETE` | `/api/resumes/:id` | Delete a resume |
