# DevMatch 🚀  
### Developer Collaboration & Networking Platform

DevMatch is a full-stack MERN application designed for developers and IT professionals to connect, collaborate, and work together on independent projects.  
Users can create professional profiles, showcase their skills and projects, send connection requests, and communicate in real time.

---

# 🌟 Features

## 👤 User Profiles
- Create and update developer profiles
- Showcase skills, interests, and tech stack
- Add past and current projects
- Share portfolio and social links

## 🤝 Developer Connections
- Send connection requests
- Accept or reject requests
- View sent and received requests
- Manage developer connections

## 💬 Real-Time Messaging
- Integrated WebSocket-based real-time chat
- Instant communication between connected users

## 🔐 Authentication & Security
- JWT-based authentication
- Protected routes and authorization
- Forgot/reset password functionality
- Secure password management

## 🔍 Search & Suggestions
- Search developers by name or skills
- Suggested developer profiles

## ⚡ Optimized Backend
- RESTful API architecture
- Optimized MongoDB queries
- Reduced backend latency
- Scalable backend structure

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)

## Real-Time Communication
- Socket.IO / WebSockets

---

# 📂 Project Structure

```bash
devMatch/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── Home/
│   │   │   ├── Navbar/
│   │   │   ├── profile/
│   │   │   └── user/
│   │   │
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── reference.md
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
├   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/devMatch.git
cd devMatch
```

---

# 📦 Install Dependencies

## Frontend

```bash
cd frontend
npm install
```

## Backend

```bash
cd server
npm install
```

---

---

# ▶️ Run the Application

## Start Backend Server

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🔑 API Documentation

Base URL:

```bash
http://localhost:5000/api
```

---

# 🔐 Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/forgot-password` | Send password reset link |
| POST | `/auth/reset-password/validate` | Validate reset token |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/change-password` | Change current password |

---

# 👤 User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/:username` | Get public profile by username |
| PATCH | `/user/:username` | Update user profile |
| GET | `/user/myprofile` | Get authenticated user profile |
| POST | `/user/project` | Add a new project |
| PATCH | `/user/project/:projectId` | Update existing project |

---

# 🤝 Connection APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/connections/requested/:userId` | Send connection request |
| PATCH | `/connections/:connectionId/:status` | Accept or reject request |
| GET | `/connections/requests` | Get received requests |
| GET | `/connections/requests/sent` | Get sent requests |
| GET | `/connections` | Get all connections |
| GET | `/user/:userId/connections` | Get connections of a specific user |
| DELETE | `/connections/:connectionId` | Delete/remove connection |

---

# 🔍 Search APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search?q={query}&limit={limit}` | Search developers |
| GET | `/search/suggestion?q={query}&limit={limit}` | Get search suggestions |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `q` | Search keyword |
| `limit` | Maximum number of results |

---

# 📰 Feed APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/feed?page={page}&limit={limit}` | Get paginated developer feed |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `page` | Page number |
| `limit` | Number of items per page |

---

# 🔒 Protected Routes

The following APIs require authentication using JWT token:

- User APIs
- Connection APIs
- Feed APIs
- Change Password API
- Add/Update Project APIs

---

# 📌 Example API Request

## Login Request

```http
POST /auth/login
Content-Type: application/json
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token"
}
```

---

# 📌 Example Protected Request

```http
GET /user/myprofile
Authorization: Bearer <jwt_token>
```

---

# ⚡ API Features

- RESTful API Architecture
- JWT Authentication & Authorization
- Protected Routes
- Pagination Support
- Search & Suggestions
- Real-Time Features Support
- Optimized MongoDB Queries
- Scalable Backend Structure

# 🔒 Authentication Flow

```text
User Login / Signup
        ↓
Server Generates JWT Token
        ↓
Token Stored in Cookies / Frontend
        ↓
Protected Routes Verify JWT
        ↓
Authorized Access Granted
```

---

# 💡 Core Functionalities

## 👨‍💻 Developer Networking
Users can discover developers with similar interests and collaborate on projects.

## 📁 Portfolio Showcase
Developers can highlight:
- Skills
- Interests
- Tech stack
- Previous projects
- Social profiles

## 💬 Real-Time Communication
Socket.IO integration enables instant messaging between connected users.

## ⚡ Scalable State Management
Redux Toolkit is used for:
- Authentication state
- User management
- Feed management
- Connection handling

---

# 📈 Performance Optimizations

- Optimized REST APIs
- Efficient MongoDB aggregation queries
- Reduced backend response time
- Reusable React components
- Centralized Redux state management

---

# 🧪 Future Improvements

- Video call integration
- AI-based developer recommendations
- GitHub profile integration
- Notifications system
- Team collaboration spaces
- Dark mode support

---


---

# ⭐ Support

If you like this project:

⭐ Star the repository  
🍴 Fork the project  
📢 Share it with others
