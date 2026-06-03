# Rose & Ivy — Luxury UAE Flower Shop (MERN Stack)

This is a complete migration of the "Rose & Ivy" flower shop application from Django to the MERN stack.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Lucide Icons
- **Backend**: NestJS (TypeScript) + Mongoose + Passport JWT
- **Database**: MongoDB (Local or Atlas)

---

## Project Structure
```
rose-and-ivy/
├── frontend/          ← React + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/   ← axios API calls
│   │   └── assets/
│   └── package.json
│
├── backend/           ← NestJS app
│   ├── src/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── wishlist/
│   │   ├── payments/
│   │   └── users/
│   ├── package.json
│   └── .env
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally (`mongodb://localhost:27017/roseandivydb`) or a MongoDB Atlas connection URI

---

### Step 1: Run MongoDB (Local)
Ensure MongoDB is running on your machine:
```bash
mongod
```
*(If using MongoDB Atlas, replace `MONGODB_URI` in `backend/.env` with your cloud URI).*

---

### Step 2: Setup and Run NestJS Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. The dependencies are already installed. Check that your `.env` contains:
   ```env
   MONGODB_URI=mongodb://localhost:27017/roseandivydb
   JWT_SECRET=roseandivy_super_secret_jwt_key_2024
   PORT=3001
   STRIPE_SECRET_KEY=sk_test_placeholder
   RAZORPAY_KEY_ID=rzp_test_placeholder
   RAZORPAY_KEY_SECRET=placeholder
   ```
3. Run the database seeder to load the 18 default products:
   ```bash
   npx ts-node -r tsconfig-paths/register src/seed/seed.ts
   ```
4. Start the backend development server:
   ```bash
   npm run start:dev
   ```
   The backend will start on [http://localhost:3001](http://localhost:3001).

---

### Step 3: Setup and Run React Frontend
1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will start on [http://localhost:5173](http://localhost:5173).

---

## Payment Flow Integration
- **Cash On Delivery (COD)**: Fully operational out-of-the-box.
- **Stripe & Razorpay**: Run in mock mode for local testing. If you replace the credentials in `backend/.env` with actual keys, they will interface with the respective payment processors.

---

## Coupon Codes
- Enter code **`FIRST10`** in the shopping cart to apply a **10% discount** on your total.
