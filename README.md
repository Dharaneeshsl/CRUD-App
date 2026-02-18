# CRUD - User Management System

## ✨ Features
- **Modern Interface**: Premium UI using Inter & Outfit fonts with glassmorphism effects.
- **Real-time Search**: Instant filtering of the user directory by name, email, or address.
- **Smart Notifications**: Custom non-intrusive toast notifications for all actions.
- **Robust Backend**: Node/Express API with secure MongoDB integration and CORS enabled.
- **Monorepo Workflow**: Managed via a root level configuration for single-command orchestration.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Axios, Bootstrap 5.3, React Icons.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.

## 📁 Project Structure
```
.
├── backend/                # Express API & MongoDB Models
│   └── src/
│       ├── controllers/    # Business logic
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API endpoints
│       └── server.js       # Entry point
├── Front-end/CRUD/         # React Application (Vite)
│   └── src/
│       ├── App.jsx         # Main orchestration & Search logic
│       ├── UserForm.jsx    # Managed form component
│       ├── UserTable.jsx   # Data display component
│       └── UserTable.css   # Premium Nexus styles
└── package.json            # Root monorepo manager
```

## 🚀 Quick Start (Monorepo Mode)

1) **Setup Environment**  
   Create `backend/.env` with your connectivity:
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/CRUD
   ```

2) **One-Command Install & Run**  
   From the root directory:
   ```bash
   # Install all dependencies (Root, Backend, Frontend)
   npm run install-all

   # Start both Frontend & Backend in development mode
   npm run dev
   ```

## 📡 API Endpoints
- `GET /api/users` — Fetch all users
- `POST /api/user` — Create new user
- `GET /api/user/:id` — Get specific user details
- `PUT /api/user/update/:id` — Update existing user
- `DELETE /api/user/delete/:id` — Remove user

## 💅 Design Credits
Tailored with a focus on "Visual Excellence" utilizing curated HSL colors ($primary: #6366f1) and responsive grid systems.

---
**Status**: 100% Complete & Verified.
