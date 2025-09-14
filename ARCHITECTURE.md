# Architecture Overview

This document outlines the key design decisions and system flow for the Elice Learning Platform, a full-stack MERN application.

## 1. System Architecture & Flow

The application is built on a decoupled client-server model, which allows for independent development, scaling, and maintenance of the frontend and backend.

-   **Client (Frontend)**: A Single Page Application (SPA) built with **React** and styled with **Ant Design**. It is responsible for all user interactions and rendering the UI. It communicates with the backend via a RESTful API.
-   **Server (Backend)**: A **Node.js** and **Express.js** API server that handles business logic, interacts with the database, and communicates with external services.
-   **Database**: A **MongoDB** database managed with **Mongoose** to persist user and course data.
-   **External Services**: The **Unsplash API** is integrated via a backend proxy to dynamically fetch course images.

### Example System Flow: User Login

1.  **User Action**: The user enters their email and password on the React login page and clicks "Log In".
2.  **Frontend Request**: The React frontend sends a `POST` request with the user's credentials to the `/api/auth/login` endpoint on the backend.
3.  **Backend Processing**:
    -   The Express server receives the request.
    -   The controller fetches the user from the MongoDB database by their email.
    -   `bcryptjs` is used to compare the submitted password with the hashed password stored in the database.
4.  **Backend Response**: If the credentials are valid, the server generates a **JSON Web Token (JWT)** signed with a secret key. This token is sent back to the frontend in a JSON response.
5.  **Frontend Session**: The React frontend receives the token and stores it (in memory via Context). It then navigates the user to the protected home page (`/`). For subsequent requests to protected routes (like `/my-courses`), this token is included in the `Authorization` header.

---

## 2. Key Design Decisions (Technology Stack Justification)

-   **Frontend: React & Ant Design**
    -   **Reasoning**: React was chosen for its mature ecosystem and component-based approach. Ant Design was chosen to accelerate development with high-quality, consistent UI components.
    -   **Alternatives Considered**: Vue.js.

-   **Backend: Node.js & Express.js**
    -   **Reasoning**: Node.js allows for a full-stack JavaScript environment. Express.js was selected for its minimalist and flexible nature, ideal for building RESTful APIs.
    -   **Alternatives Considered**: Python (with Django/Flask).

-   **Database: MongoDB**
    -   **Reasoning**: MongoDB (NoSQL) was chosen for its flexible schema, which is well-suited for rapid development. Mongoose is used as an ODM for schema validation.
    -   **Alternatives Considered**: PostgreSQL (SQL).

## 3. API Design Philosophy

-   **Endpoint Structure**: The API is designed with a RESTful approach. Key endpoints include:
    -   `POST /api/auth/register`, `POST /api/auth/login`
    -   `GET /api/courses`, `GET /api/search`
    -   `POST /api/user/enroll`, `GET /api/user/courses` (Protected)
    -   `GET /api/image-proxy`

-   **Authentication Strategy**: Uses **JSON Web Tokens (JWT)**. A middleware on the server verifies the token on protected routes before granting access.
