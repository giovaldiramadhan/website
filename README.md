# Project: Elice Learning Platform (Full-Stack Engineer Challenge)

## 1. Project Overview

Elice Learning Platform is a full-stack web application designed in response to the Full-Stack Engineer Challenge. This application allows users to discover, save, and track their learning progress. The project is built on the MERN stack (MongoDB, Express, React, Node.js) and is integrated with an external API for dynamic visual content.

**GitHub Repository Link:** [https://github.com/giovaldiramadhan/website.git](https://github.com/giovaldiramadhan/website.git)

### Core Features

-   **Responsive Frontend**: Built with React and Ant Design for a clean user experience across all devices.
-   **RESTful Backend API**: A Node.js/Express server that handles all business logic and data interactions.
-   **User Session Management**: Complete authentication system (Register & Login) using JSON Web Tokens (JWT).
-   **NoSQL Database**: Utilizes MongoDB with Mongoose for data flexibility and scalability.
-   **External API Integration**: Uses the Unsplash API to dynamically fetch course images based on their category.
-   **Functional Features**: Search, course enrollment ("Enroll"), a "My Courses" page, and progress visualization.

---

## 2. Demo and Local Setup

This project is submitted using **Option B: Local Setup with Documentation**.

### Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB (running locally or a connection to MongoDB Atlas)

<img width="1470" height="831" alt="Screenshot 2025-09-11 at 19 04 41" src="https://github.com/user-attachments/assets/5a5a73bf-f224-45b1-8d55-6fe8bf424c28" />

<img width="1470" height="830" alt="Screenshot 2025-09-11 at 19 12 20" src="https://github.com/user-attachments/assets/265da257-e755-43f0-b1d4-ee11d45c2b4e" />

<img width="1470" height="831" alt="Screenshot 2025-09-11 at 19 05 11" src="https://github.com/user-attachments/assets/a52dcf7d-4390-4b56-8f61-6104109b4a22" />

<img width="1470" height="832" alt="Screenshot 2025-09-11 at 19 05 37" src="https://github.com/user-attachments/assets/48e2523a-583a-4565-bcb8-a4264feff4f9" />

<img width="1470" height="832" alt="Screenshot 2025-09-11 at 19 05 23" src="https://github.com/user-attachments/assets/779ed569-973a-4824-95ec-1ec682dda0f0" />

<img width="1470" height="833" alt="Screenshot 2025-09-11 at 19 05 48" src="https://github.com/user-attachments/assets/9d7a48b2-4aed-4f8e-844b-bd9340dfe289" />

<img width="1470" height="832" alt="Screenshot 2025-09-14 at 16 43 21" src="https://github.com/user-attachments/assets/c9e15893-1e94-4e47-b37f-5aa16e9dcc41" />

<img width="1470" height="830" alt="Screenshot 2025-09-11 at 19 06 37" src="https://github.com/user-attachments/assets/070940b7-33b4-4a2b-89b4-fc5011801588" />

<img width="1470" height="832" alt="Screenshot 2025-09-11 at 19 06 25" src="https://github.com/user-attachments/assets/4492f299-2cfb-4820-847f-5495c9e589fc" />

<img width="1470" height="319" alt="Screenshot 2025-09-11 at 19 10 44" src="https://github.com/user-attachments/assets/ab896197-0a19-45ea-ac25-0b27a970c88b" />

### Local Setup Instructions

**A. Backend & Frontend Setup**

```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install

# Create a .env file inside /server folder and add the following:
MONGO_URI=mongodb://localhost:27017/Elice-Learning-Platform
JWT_SECRET=your_very_secure_secret_key
UNSPLASH_ACCESS_KEY=your_unsplash_api_key

# Seed the database with initial data
npm run db:seed

# Run the backend server (http://localhost:5000)
npm start

# Navigate to the frontend source directory
cd src

# Install frontend dependencies
npm install

# Run the frontend development server (http://localhost:3000)
npm start

```

Architecture Overview

This document outlines the key design decisions and system flow for the Elice Learning Platform, a full-stack MERN application.

## 1. System Architecture & Flow

The application is built on a decoupled client-server model, which allows for independent development, scaling, and maintenance of the frontend and backend.

-   **Client (Frontend)**: A Single Page Application (SPA) built with **React** and styled with **Ant Design**. It is responsible for all user interactions and rendering the UI. It communicates with the backend via a RESTful API.
-   **Server (Backend)**: A **Node.js** and **Express.js** API server that handles business logic, interacts with the database, and communicates with external services.
-   **Database**: A **MongoDB** database managed with **Mongoose** to persist user and course data.
-   **External Services**: The **Unsplash API** is integrated via a backend proxy to dynamically fetch course images.

### Example System Flow: User Enrolls in a Course

1.  **User Action**: A logged-in user clicks the "Enroll Course" button on a course detail page.
2.  **Frontend Request**: The React frontend sends a `POST` request to the protected `/api/user/enroll` endpoint. The request includes the course ID in the body and the user's JWT in the `Authorization` header.
3.  **Backend Authentication**: An authentication middleware intercepts the request, verifies the JWT to confirm the user's identity, and attaches the user's ID to the request object.
4.  **Backend Logic**: The controller function finds the user and the course in the MongoDB database. It then adds the course ID and a default progress of 0 to the user's `enrolledCourses` array.
5.  **Data Persistence**: The updated user document is saved back to the MongoDB database.
6.  **Backend Response**: The server sends a `200 OK` success message back to the frontend.
7.  **UI Feedback**: The frontend displays a success message to the user, confirming their enrollment.

---

## 2. Key Design Decisions (Technology Stack Justification)

-   **Frontend: React & Ant Design**
    -   **Reasoning**: React was selected for its mature ecosystem and component-based approach. Ant Design was chosen to accelerate development with high-quality, consistent UI components.
    -   **Alternatives Considered**: Vue.js.

-   **Backend: Node.js & Express.js**
    -   **Reasoning**: Node.js allows for a full-stack JavaScript environment. Express.js was selected for its minimalist and flexible nature, ideal for building RESTful APIs.
    -   **Alternatives Considered**: Python (with Django/Flask).

-   **Database: MongoDB**
    -   **Reasoning**: MongoDB (NoSQL) was chosen for its flexible schema, which is well-suited for rapid development. Mongoose is used as an ODM for schema validation.
    -   **Alternatives Considered**: PostgreSQL (SQL).

## 3. API Design Philosophy

-   **Endpoint Structure**: The API uses a RESTful approach. Key endpoints include:
    -   `POST /api/auth/register`, `POST /api/auth/login`
    -   `GET /api/courses`, `GET /api/search`
    -   `POST /api/user/enroll`, `GET /api/user/courses` (Protected)
    -   `GET /api/image-proxy`
-   **Authentication Strategy**: Uses **JSON Web Tokens (JWT)**. A middleware on the server verifies the token on protected routes before granting access.

# Technology Choices and Justification

This document outlines the key technology choices for the Elice Learning Platform and the reasoning behind each decision, as required by the Full-Stack Engineer Challenge.

## 1. Frontend: React & Ant Design

-   **Framework: React**
    -   **Reasoning**: React was selected for its mature ecosystem, component-based architecture, and strong community support. Its use of a virtual DOM allows for efficient and performant user interfaces, which is crucial for a smooth learning experience. The component-based approach enabled the creation of a modular and reusable UI, making the application easier to maintain and scale.
    -   **Alternatives Considered**: Vue.js was considered for its gentler learning curve. However, React was ultimately chosen due to its wider industry adoption and the larger available talent pool, making it a more strategic choice for a long-term project.

-   **UI Library: Ant Design**
    -   **Reasoning**: Ant Design was chosen as the accompanying UI library to accelerate development. It provides a comprehensive set of high-quality, consistent, and accessible components (like Cards, Forms, and Pagination) out of the box. This allowed for the rapid creation of a professional and modern-looking interface without needing to write extensive custom CSS.

## 2. Backend: Node.js & Express.js

-   **Runtime & Framework: Node.js with Express.js**
    -   **Reasoning**: Node.js allows for the use of JavaScript on the server-side, creating language consistency across the full stack (MERN). This unified language approach streamlines development and reduces context-switching. Express.js was selected as the web framework because of its minimalist, fast, and unopinionated nature, providing the flexibility needed to build a custom RESTful API from the ground up without unnecessary overhead.
    -   **Alternatives Considered**: Python with the Django framework was considered. While powerful, Django is more opinionated. Express.js was preferred for this challenge to demonstrate building an API architecture from a more fundamental level.

## 3. Database: MongoDB with Mongoose

-   **Database: MongoDB**
    -   **Reasoning**: MongoDB, a NoSQL document database, was chosen for its flexible schema. This is highly advantageous in an iterative development process, as it allows for easy modifications to the data model as new features (like `enrolledCourses` and `savedContent`) are added. Its JSON-like BSON format integrates seamlessly with JavaScript/Node.js.
    -   **Alternatives Considered**: A relational database like PostgreSQL was a strong contender due to its data integrity and ACID compliance. However, MongoDB was selected to prioritize development speed and demonstrate proficiency with modern NoSQL technologies, which are common in scalable web applications.

-   **ODM: Mongoose**
    -   **Reasoning**: The Mongoose library was used as an Object Data Modeling (ODM) tool to bridge the gap between the application code and the database. It provides a straightforward, schema-based solution to model application data, enforce validation rules, and simplify database queries.

# Critical Analysis of the Elice Learning Platform

This document provides a critical analysis of the Elice Learning Platform project, outlining its strengths, current limitations, and potential future improvements as required by the Full-Stack Engineer Challenge.

## What Works Well

The project successfully establishes a robust and modern full-stack application foundation that meets the core requirements of the challenge.

1.  **Solid Architectural Foundation**: The separation between the React frontend and the Node.js/Express backend creates a clean, scalable, and maintainable monorepo structure. This decoupling allows for independent development and deployment of the client and server.

2.  **Modern Frontend Experience**: The use of React combined with the Ant Design component library provides a professional, responsive, and consistent user interface. State management is handled efficiently through React's Context API, creating a scalable solution without the boilerplate of larger libraries like Redux.

3.  **Functional User Authentication**: The JWT-based authentication system is a key strength. It successfully handles user registration, login, and session management, enabling protected routes and a personalized user experience. The use of a middleware for protecting server routes is a security best practice.

4.  **Effective External API Integration**: The integration with the Unsplash API via a backend proxy is a meaningful implementation. It not only fulfills the challenge requirement but also enhances the application's visual appeal dynamically while keeping sensitive API keys secure on the server.

## Limitations and Trade-offs

While the foundation is strong, certain trade-offs were made, and some features are not yet fully implemented.

1.  **Basic Search Functionality**: The search feature successfully queries the internal database. However, it does not yet integrate results from an external educational API (like YouTube), which was mentioned as a potential extension in the integration strategy. This limits the scope of "content discovery."

2.  **Client-Side Filtering for Categories**: The "Courses by Category" page currently fetches the entire list of courses and filters them on the client side. For a larger dataset, this is inefficient. The optimal solution would be a dedicated backend endpoint (`/api/courses?category=...`) that handles filtering and pagination directly on the server.

## Next Improvements

The current platform is an excellent foundation for several key improvements that would elevate it to a production-ready application.

1.  **Implement Dynamic Progress Updates**:
    * **Backend**: Create new API endpoints (e.g., `PATCH /api/user/courses/:courseId/progress`) to allow users to update their progress for a specific course.
    * **Frontend**: On the `SingleCoursePage`, add UI elements (e.g., checkboxes for each content item) that, when clicked, call the new API endpoint to update and persist the user's learning progress. The overall progress chart in the sidebar would then reflect this real data.

2.  **Enhance Search with External APIs**:
    * Expand the search functionality by integrating the **YouTube Data API**. When a user searches, the backend would query both the internal MongoDB database and the YouTube API, merging the results to provide a truly comprehensive learning resource list.

3.  **Build an Automated Testing Suite**:
    * **Backend**: Write unit and integration tests for all API endpoints using Jest and Supertest to ensure reliability.
    * **Frontend**: Write component tests using React Testing Library to verify UI behavior, especially for the authentication forms and course enrollment process.

4.  **Deploy to the Cloud**:
    * Deploy the frontend to **Vercel** and the backend to a service like **Render** or **Railway**. This would provide a live, publicly accessible demo link, fulfilling Option A of the submission requirements and showcasing skills in modern deployment workflows.