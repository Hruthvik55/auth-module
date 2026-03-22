# Authentication Module Backend

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT
- bcrypt

## Features
- User Registration with OTP verification
- Secure password hashing
- JWT Authentication (Access + Refresh tokens)
- Protected routes
- MongoDB database integration

## API Endpoints
- POST /auth/register
- POST /auth/verify-otp
- POST /auth/login
- GET /auth/me

## How to Run
1. Install dependencies:
   npm install

2. Create .env file:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/authdb
   JWT_SECRET=secret
   JWT_REFRESH_SECRET=refreshsecret

3. Run server:
   npm run dev
