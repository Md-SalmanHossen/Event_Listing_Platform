# Event Listing Platform

A full-stack event listing platform built with MERN stack.

## 🔗 Live Website
Frontend: https://event-listing-platform-esla.vercel.app  
Backend API: https://event-listing-platform-o9hbtyd6l-salmans-projects-c12370bd.vercel.app

## 🛠 Tech Stack
- Frontend: React (Vite), Tailwind CSS, Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT
- Deployment: Vercel (Frontend + Backend)

# Event Listing Platform - Backend Documentation

## Overview

This is the backend API for the **Event Listing Platform**, built using **Node.js**, **Express**, and **MongoDB**. It provides endpoints for user authentication, event management, ticket booking, and dashboards for both users and organizers.

---

## Table of Contents

1. [Installation](#installation)
2. [Folder Structure](#folder-structure)
3. [Environment Variables](#environment-variables)
4. [API Routes](#api-routes)

   * [User Routes](#user-routes)
   * [Event Routes](#event-routes)
   * [Ticket Routes](#ticket-routes)
   * [Dashboard Routes](#dashboard-routes)
5. [Middleware](#middleware)
6. [Utilities](#utilities)
7. [Running the Project](#running-the-project)

---

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the provided `.env` example.

4. Start the development server:

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.

---

## Folder Structure

```
server/
│
├─ configs/
│   ├─ cloudinary.config.js
│   └─ db.config.js
│
├─ controllers/
│   ├─ dashboard.controller.js
│   ├─ event.controller.js
│   ├─ ticket.controller.js
│   └─ user.controller.js
│
├─ middlewares/
│   ├─ auth.middleware.js
│   ├─ multer.middleware.js
│   └─ route_handler.middleware.js
│
├─ models/
│   ├─ event.model.js
│   ├─ ticket.model.js
│   └─ user.model.js
│
├─ routes/
│   ├─ dashboard.routes.js
│   ├─ event.routes.js
│   ├─ ticket.routes.js
│   ├─ user.routes.js
│   └─ organizer.routes.js
│
├─ utils/
│   └─ generate_token.js
│
├─ .env
├─ app.js
└─ index.js
```

---

## Environment Variables

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

---

## API Routes

### User Routes (`/v1/user`)

| Endpoint            | Method | Description               | Auth Required |
| ------------------- | ------ | ------------------------- | ------------- |
| `/register`         | POST   | Register a new user       | ❌             |
| `/login`            | POST   | Login as a user           | ❌             |
| `/profile`          | GET    | Get user profile          | ✅             |
| `/profile`          | PUT    | Update profile image      | ✅             |
| `/become-organizer` | PUT    | Upgrade user to organizer | ✅             |

---

### Event Routes (`/v1/user/event`)

| Endpoint              | Method | Description                                          | Auth Required      |
| --------------------- | ------ | ---------------------------------------------------- | ------------------ |
| `/`                   | POST   | Create a new event                                   | ✅ (Organizer only) |
| `/`                   | GET    | Get all events (supports pagination `?page=&limit=`) | ✅                  |
| `/:id`                | GET    | Get single event by ID                               | ✅                  |
| `/:id`                | PUT    | Update event by ID                                   | ✅ (Organizer only) |
| `/:id`                | DELETE | Delete event by ID                                   | ✅ (Organizer only) |
| `/organizer/my-event` | GET    | Get events of logged-in organizer                    | ✅ (Organizer only) |

---

### Ticket Routes (`/v1/user/ticket`)

| Endpoint               | Method | Description                            | Auth Required      |
| ---------------------- | ------ | -------------------------------------- | ------------------ |
| `/book`                | POST   | Book a ticket for an event             | ✅                  |
| `/my`                  | GET    | Get tickets of logged-in user          | ✅                  |
| `/cancel/:ticketId`    | PUT    | Cancel a ticket                        | ✅                  |
| `/confirmed/:ticketId` | PUT    | Confirm a ticket (Organizer)           | ✅                  |
| `/organizer/tickets`   | GET    | Get all tickets for organizer's events | ✅ (Organizer only) |

---

### Dashboard Routes (`/v1/dashboard`)

| Endpoint     | Method | Description                         | Auth Required      |
| ------------ | ------ | ----------------------------------- | ------------------ |
| `/user`      | GET    | Get dashboard summary for user      | ✅                  |
| `/organizer` | GET    | Get dashboard summary for organizer | ✅ (Organizer only) |

---

## Middleware

* **auth.middleware.js**: Protect routes and verify JWT.
* **multer.middleware.js**: Handle file uploads.
* **route_handler.middleware.js**: Optional centralized error handling.

---

## Utilities

* **generate_token.js**: Generates JWT tokens for authentication.

---

## Running the Project

```bash
npm run dev
```

Visit `http://localhost:5000` and use Postman to test endpoints.

---

## Notes

* Only users with `role: organizer` can access certain endpoints like creating events, confirming tickets, or viewing organizer dashboard.
* Pagination supported for event listing using `page` and `limit` query params.
* Cloudinary is used for image upload.
