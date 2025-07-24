# 🛡️ Military Asset Management System

A full-stack role-based web application to manage military assets like weapons and ammunition across different bases. Built as part of a Full Stack Engineer assignment.

---

## 🚀 Features

- 🔐 **Secure Login with JWT**
- 👥 **Role-Based Access Control** (Admin, Logistics, Commander)
- 📦 **Inventory Dashboard** per Base
- ➕ **Asset Purchases**
- 🔁 **Asset Transfers** across bases
- 🎯 **Asset Assignment to Units**
- 📝 **Admin-only Logs View**
- 📊 **Closing Balance & Net Movement Calculations**

---

## 👤 Roles & Access

| Role       | Dashboard | Purchase | Transfer | Assignment | Logs  |
|------------|-----------|----------|----------|------------|-------|
| **Admin**     | yes        | yes       | yes        | yes         |yes     |
| **Logistics** | yes        | no        | yes        | yes         | no     |
| **Commander** | yes         | no        | no        | no          | no     |

---

## 🧪 Test Users

| Role       | Email                  | Password   |
|------------|------------------------|------------|
| Admin      | `admin@example.com`    | `admin123` |
| Logistics  | `logi@example.com`     | `admin123` |
| Commander  | `commander@example.com`| `admin123` |

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, JWT, MongoDB
- **Database:** MongoDB (Atlas or Local)
- **Auth:** JWT-based auth with role-based middleware

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/military-asset-system.git
cd military-asset-system

2. Backend Setup

cd backend
npm install

Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Seed Users and Inventory

# Start the backend first
npm start

# In another terminal, use Postman or curl to hit:
POST http://localhost:5000/api/seed-admin
POST http://localhost:5000/api/seed-logistics
POST http://localhost:5000/api/seed-commander
POST http://localhost:5000/api/seed-inventory

3. Frontend Setup

cd ../frontend
npm install
npm run dev