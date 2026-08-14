# Task Management System (Full-Stack Assessment)

A modern, full-stack Task Management application built with **Next.js 14 (App Router)**, **NestJS**, **MongoDB**, and **Tailwind CSS**. Designed with high design fidelity, responsive UI, guest user authentication, real-time-like updates, and persistent theme support (Dark/Light mode).

---

## Repository & Folder Structure

* **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide React, Next-Themes
* **Backend:** NestJS (REST API), Mongoose, Class-Validator, Class-Transformer
* **Database:** MongoDB (Local or MongoDB Atlas)
* **Language:** TypeScript (Strict Mode)

```text
task-manager/
├── backend/                   # NestJS REST API Application
│   ├── src/
│   │   ├── auth/              # Guest authentication & session module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   ├── tasks/             # Task CRUD & business logic module
│   │   │   ├── dto/
│   │   │   │   ├── create-task.dto.ts
│   │   │   │   └── update-task.dto.ts
│   │   │   ├── schemas/
│   │   │   │   └── task.schema.ts
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.module.ts
│   │   │   └── tasks.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
└── frontend/                  # Next.js App Router Application
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx     # Root layout with font & theme providers
    │   │   ├── page.tsx       # Main Kanban task dashboard
    │   │   ├── globals.css    # Tailwind CSS directives
    │   │   └── providers.tsx  # Next-Themes ThemeProvider wrapper
    │   ├── components/
    │   │   ├── Navbar.tsx     # Navigation header with guest status
    │   │   ├── ThemeToggle.tsx# Dark/Light mode switcher
    │   │   └── TaskCard.tsx   # Task card item with status actions
    │   ├── types/             # Shared TypeScript definitions
    │   └── lib/               # Axios API client setup
    ├── .env.local
    ├── package.json
    └── tailwind.config.ts

    ** Key Features
** Frontend & Design Fidelity
Figma Alignment: Precise layout, typography, colors, and responsive card components based on the assessment requirements.

Theme Support: Persistent Light and Dark theme switching using next-themes (prevents theme flicker on page refresh).

Responsive Layout: Fully optimized for mobile, tablet, and desktop viewports.

Kanban-Style Status Columns: Visual classification for tasks (TODO, IN_PROGRESS, COMPLETED) with dynamic count badges.

** Backend Architecture
Guest Authentication: One-click guest session generation to start creating tasks instantly.

Request Validation: Global Validation Pipe using class-validator and class-transformer for strict runtime DTO validation.

Clean Code & Modular Structure: Separated Tasks and Auth modules following NestJS best practices.

CORS Configured: Configured cross-origin support for seamless Next.js and NestJS integration


** Environment Variables Setup

Backend Environment (backend/.env)
Create a .env file in the backend directory:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager


Frontend Environment (frontend/.env.local)
Create a .env.local file in the frontend directory:
NEXT_PUBLIC_API_URL=http://localhost:5000


### Running the Backend (NestJS)
cd backend
npm install
npm run start:dev

### Running the Frontend (Next.js)
cd frontend
npm install
npm run dev