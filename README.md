# Virtual Event Management Platform – Backend

A backend system for managing virtual events, built with Node.js and Express.js. It supports user registration, event creation, and participant management using in-memory data structures.

---

## Features

- User Authentication with JWT and bcrypt
- Role-based access: Organizers and Attendees
- Event Management: Create, Update, Delete events (Organizer only)
- Event Registration: Attendees can register for events
- Email Notification on successful event registration
- All data stored using in-memory objects/arrays (no database used)

---

## 🛠 Technologies Used

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken (JWT)
- nodemailer

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-platform.git
cd event-management-platform
