# 🐱 Stage 0 - Backend Wizards: Dynamic Profile Endpoint

A simple Node.js + Express REST API that returns your profile information along with a dynamic cat fact fetched from the [Cat Facts API](https://catfact.ninja/fact).

---

## 🚀 Features
- `/me` endpoint returning:
  ```json
  {
    "status": "success",
    "user": {
      "email": "you@example.com",
      "name": "Your Full Name",
      "stack": "Node.js/Express"
    },
    "timestamp": "2025-10-17T12:34:56.789Z",
    "fact": "Random cat fact from API"
  }
