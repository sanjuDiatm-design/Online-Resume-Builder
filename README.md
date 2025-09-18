# Online Resume Builder

A full‑stack web application to create, preview, and export professional resumes using modern web technologies. The project showcases secure user authentication with JWT, a responsive React UI, and a Node/Express API backed by MongoDB.

## ✨ Features
- **Authentication**: Signup, login, and token‑based sessions (JWT)
- **Resume Builder**: Live preview with multiple templates
- **Export**: Print/Save to PDF using browser print and client utilities
- **Responsive UI**: Optimized for desktop and mobile
- **Authorization**: Example admin‑only route for role‑based access

## 🧱 Architecture
- **Frontend**: React (Vite), React Router, component‑scoped styles in `src/StyleSheets`
- **Backend**: Node.js, Express 5, JWT auth, role middleware
- **Database**: MongoDB with Mongoose models
- **Tooling**: ESLint, Nodemon for hot reloading

```
root
├─ public/
├─ src/
│  ├─ components/        # Login, Signup, ResumeBuilder, etc.
│  ├─ StyleSheets/       # Component styles
│  ├─ main.jsx           # App bootstrap (Router)
│  └─ App.jsx            # Root layout
├─ server/
│  ├─ models/            # Mongoose User model
│  ├─ routes/            # Auth routes (signup, login, me)
│  ├─ utils/             # JWT auth middleware
│  └─ server.js          # Express entry
└─ package.json
```

## 🛠️ Tech Stack
- React 19, React Router
- Vite 7
- Express 5
- Mongoose 8
- JSON Web Tokens (jsonwebtoken)
- bcryptjs, cors, dotenv

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or remote)

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment (server/.env)
Create `server/.env` with:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_builder
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 3) Run the app
- Backend (port 5000)
```bash
npm run server:dev
```
- Frontend (port 5173)
```bash
npm run dev
```
Health check: `http://localhost:5000/health`

## 🔐 Authentication & Authorization
- Signup: `POST /api/auth/signup` with `{ name, email, password }`
- Login: `POST /api/auth/login` → returns `{ token, user }`
- Current user: `GET /api/auth/me` with header `Authorization: Bearer <token>`
- Admin example: `GET /api/auth/admin-only` (requires `admin` role)

Frontend stores the JWT in `localStorage` and uses it on subsequent requests.

## 📦 NPM Scripts
- `npm run dev` – Start frontend (Vite)
- `npm run server` – Start backend
- `npm run server:dev` – Backend with hot reload (nodemon)
- `npm run build` – Build frontend
- `npm run preview` – Preview production build
- `npm run lint` – Lint codebase

## 🧪 API Quick Test
```bash
# Login
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourPassword"}'

# Use the returned token
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/auth/me
```

## 🧭 Implementation Notes
- Passwords are salted and hashed with bcrypt (never stored in plaintext).
- JWT includes `sub` (user id) and `roles`; expiry is configurable via `.env`.
- CORS is restricted to configured origins.

## 🗺️ Roadmap
- More resume templates
- Drag‑and‑drop section ordering
- Save/load resumes from cloud storage
- Profile management and avatar upload

## 🤝 Contributing
Issues and PRs are welcome. Please run linting before submitting:
```bash
npm run lint
```

## 📄 License
MIT License

## 👤 About This Project
Built to demonstrate end‑to‑end product development: modern React UI, secure Node/Express APIs, MongoDB data layer, and pragmatic DevEx with Vite & ESLint.
