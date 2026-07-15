📘 ExamNotes AI — Smart AI Notes & Revision Generator
ExamNotes AI is a modern, full-stack web application designed to help students and educators generate high-yield, exam-oriented study notes, visual diagrams, and interactive charts in seconds. Powered by the Google Gemini API, the platform provides tailored study materials, quick 5-minute revision sheets, practice questions, visual flowcharts, and downloadable, print-ready PDFs.

🚀 Key Features
🧠 AI-Powered Notes Generation: Input any topic, academic class/level, and target exam type (e.g., CBSE, JEE, NEET) to receive custom, high-yield notes.
⚡ 5-Minute Quick Revision Mode: Instantly toggle notes into a condensed, bulleted format containing definitions, formulas, and critical keywords—perfect for last-minute cramming.
📊 Dynamic Visual Diagrams: Automatically generates and renders step-by-step visual flowcharts using Mermaid.js based on the topic.
📈 Interactive Recharts: Integrates custom charts (bar, line, pie) to visually represent weightage, processes, or numeric comparisons related to the topic.
⬇️ Instant PDF Download: Generates print-ready, clean PDFs on-the-fly using PDFKit streamed directly from the backend.
🔐 Google Auth & JWT Security: Safe user authentication via Firebase Google Sign-In on the client and secure HTTP-Only JWT cookies on the backend.
💳 Stripe Checkout & Webhooks: Integrated credit-based model (10 credits per notes generation) powered by Stripe Checkout and secure Stripe webhooks for credit top-ups.
📚 History Workspace: Access and retrieve all previously generated notes at any time from your dashboard.
🛠️ Tech Stack
Frontend
Framework: React 19 (Vite)
Styling: Tailwind CSS (v4), Motion (Framer Motion)
State Management: Redux Toolkit & React Redux
Routing: React Router DOM (v7)
Data Rendering: React Markdown, Mermaid.js, Recharts, React Icons
HTTP Client: Axios
Backend
Runtime: Node.js & Express
Database: MongoDB (via Mongoose ODM)
PDF Generation: PDFKit
Authentication: JWT (JSON Web Tokens), Cookie-Parser
Payment Processing: Stripe SDK
AI Integration
Model: Google Gemini API (gemini-3-flash-preview / gemini-1.5-flash)
📂 Project Structure
text

ExamNotesGenerator/
├── client/                 # React frontend application
│   ├── public/             # Static public assets (icons, SVGs)
│   ├── src/
│   │   ├── assets/         # App images and illustrations
│   │   ├── components/     # Reusable UI components (Sidebar, Navbar, TopicForm, Charts, Mermaid, etc.)
│   │   ├── Pages/          # Views (Home, Auth, Notes, History, Pricing, Success/Failure)
│   │   ├── redux/          # Redux Store & User slices
│   │   ├── services/       # Axios API integration layer
│   │   ├── utils/          # Firebase initialization
│   │   ├── App.jsx         # App router and bootstrap
│   │   ├── index.css       # Core Tailwind CSS imports
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Express backend server
    ├── controllers/        # Route controllers (auth, notes, pdf, stripe credits, etc.)
    ├── middleware/         # Auth verification middleware (isAuth)
    ├── models/             # Mongoose schemas (User, Notes)
    ├── routes/             # Express API endpoints
    ├── services/           # Gemini API Integration service
    ├── utils/              # Database connection, token creators & prompt builders
    ├── index.js            # Server entry point
    └── package.json
⚙️ Environment Configuration
To run this application locally, you will need to configure environment variables for both the client and the server.

1. Server Environment Variables (server/.env)
Create a .env file inside the server/ directory and configure the following variables:

env

PORT=8000
NODE_ENV=development
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/examnotes
# JWT Secret Key
JWT_SECRET_KEY=your_jwt_secret_key_here
# Client URL (for CORS and Stripe Redirects)
CLIENT_URL=http://localhost:5173
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
# Stripe Integration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret_here
PAYMENT_ENABLED=true
2. Client Environment Variables (client/.env)
Create a .env file inside the client/ directory:

env

VITE_SERVER_URL=http://localhost:8000
# Firebase Config (for Google Sign-In)
VITE_FIREBASE_APIKEY=your_firebase_api_key_here
🏃 Local Installation & Setup
Follow these steps to set up and run the application locally:

Step 1: Clone the Repository
bash

git clone https://github.com/your-username/ExamNotesGenerator.git
cd ExamNotesGenerator
Step 2: Set up the Backend Server
bash

cd server
npm install
Start the development server (runs on port 8000 by default):

bash

npm run dev
Step 3: Set up the Frontend Client
Open a new terminal window:

bash

cd client
npm install
Start the frontend development server (runs on port 5173 by default):

bash

npm run dev
🌐 API Endpoint Documentation
Authentication Routes (/api/auth)
POST /api/auth/google - Verifies Google Sign-In details and returns user object with a secure HTTP-Only session token.
POST /api/auth/logout - Clears session cookies.
Notes Routes (/api/notes)
POST /api/notes/generate-notes - Takes topic inputs, constructs prompts, calls Gemini AI, deducts 10 credits, and saves results.
GET /api/notes/mynotes - Retrieves a list of notes generated by the current user.
GET /api/notes/singlenotes/:id - Fetches specific note content by ID.
PDF Routes (/api/pdf)
POST /api/pdf/generate-pdf - Uses PDFKit to compile note details into a print-friendly document stream.
Credit/Stripe Routes (/api/credit & /api/credits)
POST /api/credit/checkout - Initiates a Stripe Checkout Session for buying credit packs.
POST /api/credits/webhook - Standard Stripe webhook that processes successful transactions and updates user credits.
