# Bitespeed Identity Reconciliation - Deployed on Render

This project implements the Bitespeed Backend Task: Identity Reconciliation.
It is currently deployed and working at the following URL:

🔗 **Live API Endpoint**: [https://bitespeed-backend-task-identity-5d0f.onrender.com](https://bitespeed-backend-task-identity-5d0f.onrender.com)

---

## 🚀 How to Use

### 🔹 API Endpoint

```
POST /identify
https://bitespeed-backend-task-identity-5d0f.onrender.com/identify
```

### 🔹 Headers

```
Content-Type: application/json
```

### 🔹 Sample Request Body

```
{
  "email": "alex@example.com",
  "phoneNumber": "9876543210"
}
```

### 🔹 Sample Response

```
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["alex@example.com"],
    "phoneNumbers": ["9876543210"],
    "secondaryContactIds": []
  }
}
```

---

## ✅ Test Cases to Try

| Scenario                         | Input                                                  | Expected Result                                                                 |
|----------------------------------|---------------------------------------------------------|----------------------------------------------------------------------------------|
| First entry                      | email + phone                                           | Creates a new primary contact                                                    |
| Same email only                  | { "email": "alex@example.com" }                         | Returns the same primary contact                                                 |
| Same phone only                  | { "phoneNumber": "9876543210" }                         | Returns the same primary contact                                                 |
| Existing phone + new email       | { "email": "new@example.com", "phoneNumber": "9876543210" } | Creates a secondary contact linked to the primary                                |

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL (via Sequelize)
- Hosted on Render

---

## 👨‍💻 Developer

Deployed by Anurag
