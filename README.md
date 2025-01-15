# **Booking Data Ingestion System**
---
## **NOTE**
**POSTMAN COLLECTION LINK** (https://www.postman.com/dhanushv56/finkraft-ai/collection/b9vuruf/api?action=share&creator=41098241)

## **Features**

1. **CRUD Operations**: Create, retrieve, and delete booking records with ease.
2. **Validation**: Input validation using **Joi** to ensure data integrity.
4. **Pagination**: Efficient handling of large datasets with pagination.
6. **Error Handling**: Centralized error handling for consistent API responses.
7. **Modular Architecture**: Separation of concerns across controllers, services, and middleware.

---

## **Project Structure**

```plaintext
booking-data-ingestion/
├── config/
│   └── db.js           # MongoDB connection
├── controllers/
│   └── bookingController.js   # API logic
├── models/
│   └── Booking.js      # MongoDB schema
├── routes/
│   └── bookingRoutes.js # API routes
├── services/
│   └── bookingService.js # Business logic
├── validators/
│   └── bookingValidator.js  # Validation schemas
├── .env                # Environment variables
├── server.js           # Application entry point
└── package.json        # Dependencies and scripts
```

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/DhanuV/booking-data-ingestion.git
   cd booking-data-ingestion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/booking_data
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## **Endpoints**

### **1. Create Booking**
- **POST** `/api/bookings`
- **Request Body**:
  ```json
  {
    "bookingId": "B12345",
    "customerName": "John Doe",
    "bookingDate": "2023-12-31",
    "amount": 150.5,
    "vendor": "Vendor A"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "booking": { /* Created booking data */ }
  }
  ```

---

### **2. Get Bookings**
- **GET** `/api/bookings`
- **Query Parameters**:
  - `date` (optional): Filter by booking date (`YYYY-MM-DD`).
  - `vendor` (optional): Filter by vendor name.
  - `page` (optional): Page number (default: 1).
  - `limit` (optional): Results per page (default: 10).
- **Response**:
  ```json
  {
    "success": true,
    "bookings": [ /* Array of booking data */ ]
  }
  ```

---

### **3. Get Booking By ID**
- **GET** `/api/bookings/:id`
- **Path Parameter**:
  - `id`: Booking ID.
- **Response**:
  ```json
  {
    "success": true,
    "booking": { /* Booking data */ }
  }
  ```

---

### **4. Delete Booking**
- **DELETE** `/api/bookings/:id`
- **Path Parameter**:
  - `id`: Booking ID.
- **Response**:
  ```json
  {
    "success": true
  }
  ```

---

## **Technologies Used**

- **Node.js**: Backend runtime.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Joi**: Input validation.
- **Mongoose**: MongoDB object modeling tool.
- **dotenv**: Environment variable management.

---

## **Future Enhancements**

1. Add **PATCH** endpoint for updating booking records.
2. Implement **rate limiting** for sensitive routes.
3. Implement **Caching** for frequently used API's.
4. **Indexing in MongoDB** to optimize queries.
5. Add unit and integration tests.
6. Monitoring using **Data Dog** and **Sentry**
7. Introduce logging with tools like **Winston** or **Morgan**.
8. Clustering and Monitoring using **PM2**

---
sequenceDiagram

![image](https://github.com/user-attachments/assets/ddc70c53-9b54-4e63-a0f8-8f63e385562a)

---
