# 🎓 Student Fee Management System

## Overview
A full-stack Student Fee Management System with authentication, student management, and fee payment tracking. The backend is built with Node.js, Express, and MongoDB, while the frontend uses React, TypeScript, and Tailwind CSS for a modern, responsive UI.

---

## 🚀 Features

### Backend
- ✅ Student registration and login (JWT-based authentication)
- ✅ View and update student profile
- ✅ Fee payment status tracking
- ✅ List all registered students
- ✅ Secure routes with JWT middleware
- ✅ Logout functionality

### Frontend
- ✅ Register and login forms with validation
- ✅ Profile page with fee status and payment CTA
- ✅ All Students page with search, filter, and pagination
- ✅ Pay Fees page with mock payment form
- ✅ Responsive Navbar with authentication-aware links
- ✅ Protected and public route handling
- ✅ Modern UI components (alerts, badges, cards, buttons, etc.)

---

## API Routes

All backend routes are prefixed with `/api/v1/students`:

| Method | Endpoint         | Description                        | Auth Required |
|--------|------------------|------------------------------------|--------------|
| POST   | /register        | Register a new student             | No           |
| POST   | /login           | Login as a student                 | No           |
| GET    | /get-all         | Get all registered students        | No           |
| PATCH  | /update          | Update student details             | Yes          |
| PATCH  | /toggle-fees     | Mark fees as paid                  | Yes          |
| POST   | /logout          | Logout student                     | Yes          |
| GET    | /current         | Get current student profile        | Yes          |

---

## Frontend Routes

| Path           | Component      | Access      | Description                       |
|----------------|---------------|-------------|-----------------------------------|
| /              | Redirect      | Public      | Redirects to /login               |
| /register      | Register      | Public      | Student registration form         |
| /login         | Login         | Public      | Student login form                |
| /all-students  | AllStudents   | Public      | List/search all students          |
| /profile       | Profile       | Protected   | View/update profile, pay fees     |
| /pay-fees      | PayFees       | Protected   | Fee payment form                  |

---

## Project Structure

```
Elite8Digital_Assignment/
├── Backend/
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── constants.js
│       ├── db/
│       │   └── index.js
│       ├── controllers/
│       │   └── student.controllers.js
│       ├── models/
│       │   └── student.models.js
│       ├── routes/
│       │   └── student.routes.js
│       ├── middlewares/
│       │   └── auth.middlewares.js
│       └── utils/
│           ├── ApiError.js
│           ├── ApiResponse.js
│           └── asyncHandler.js
├── Frontend/
│   └── frontend/
│       ├── package.json
│       ├── package-lock.json
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── tsconfig.app.json
│       ├── tsconfig.node.json
│       ├── public/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   ├── index.css
│       │   ├── App.css
│       │   ├── api/
│       │   │   └── axios.ts
│       │   ├── hooks/
│       │   │   └── useAuth.ts
│       │   ├── lib/
│       │   │   └── utils.ts
│       │   ├── pages/
│       │   │   ├── AllStudents.tsx
│       │   │   ├── Register.tsx
│       │   │   ├── Login.tsx
│       │   │   ├── Profile.tsx
│       │   │   └── PayFees.tsx
│       │   ├── routes/
│       │   │   ├── ProtectedRoute.tsx
│       │   │   └── PublicRoute.tsx
│       │   ├── components/
│       │   │   ├── Navbar.tsx
│       │   │   └── ui/
│       │   │       ├── alert.tsx
│       │   │       ├── avatar.tsx
│       │   │       ├── badge.tsx
│       │   │       ├── button.tsx
│       │   │       ├── card.tsx
│       │   │       ├── input.tsx
│       │   │       ├── label.tsx
│       │   │       └── pagination.tsx
│       │   ├── assets/
│       │   └── contexts/
│       ├── components.json
│       ├── README.md
│       └── eslint.config.js
└── Readme.md
```

---

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Hook Form, Axios, Lucide Icons, Shadcn

---

## Credits
UI was enhanced with the help of Claude AI for modern design and user experience improvements.
