# Lit🔥 Lib📚

## Overview

**lit-lib** is a simple, full-stack book store web application that lets users securely manage a collection of books. Features include user authentication, CRUD operations, and a clean, responsive interface for easy browsing and management.

---
## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
---

## Features

- **User Authentication:** Secure sign up and login with JWT.
- **Role-Based Authorization:** Access control for different user roles.
- **Book Management:** Add, view, edit, and delete books (CRUD operations).
- **Book Listing & Sorting:** Browse all books and sort them easily.
- **Responsive Design:** Works smoothly on desktop and mobile.
- **Notifications:** Get instant feedback for your actions (like adding or deleting a book).
---

## Demo

🔗 **Live Demo:** NA

![Signup page](public/ss1.png)
![Login page](public/ss2.png)
![Home page- Table](public/ss3.png)
![Home page- Card](public/ss4.png)
![Create/Add book](public/ss5.png)
![Show book](public/ss6.png)
![Edit book](public/ss7.png)
---

## Tech Stack

**Frontend:**
- React
- React Router
- Tailwind CSS
- Axios
- notistack (for notifications)

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (jsonwebtoken)
- bcrypt (for password security)
- dotenv, cors, validator

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thepushkarB/lit-lib.git
   cd lit-lib
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Visit the app: at your localhost**  

---

## Folder Structure

```
lit-lib/
├── backend/    # Backend API (Node.js, Express, MongoDB)
└── frontend/   # Frontend app (React, Tailwind CSS)
```

---

## Usage

- **Sign up** for a new account or **log in**.
- **Browse** the list of books.
- **Add, edit, or delete** books (if you have the right permissions).


