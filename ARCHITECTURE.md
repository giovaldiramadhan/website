### 2. Content for `ARCHITECTURE.md`

```markdown:ARCHITECTURE.md
# Architecture Analysis & API Design

## 1. Technology Stack Justification

The technology stack was chosen to create a consistent, modern, and efficient development environment.

-   **Frontend: React & Ant Design**
    -   **Reasoning**: React was selected for its mature ecosystem and component-based approach, which allows for modular and reusable UI development. Ant Design was chosen as the component library to accelerate development by providing high-quality, consistent, and accessible UI components.
    -   **Alternatives Considered**: Vue.js was considered for its gentler learning curve, but React was chosen due to its wider industry adoption and larger talent pool.

-   **Backend: Node.js & Express.js**
    -   **Reasoning**: Node.js allows the use of JavaScript on the server-side, creating language consistency across the full stack. Express.js was selected as the framework for its minimalist, fast, and unopinionated nature, making it ideal for building RESTful APIs.
    -   **Alternatives Considered**: Python (with Django/Flask) was considered. However, Node.js was chosen to avoid language context-switching between the frontend and backend.

-   **Database: MongoDB**
    -   **Reasoning**: MongoDB, a NoSQL database, was chosen for its flexible schema, which is well-suited for rapid and iterative application development. Its JSON-like document structure integrates naturally with Node.js. Mongoose is used as an ODM (Object Data Modeling) library to provide schema validation and simplify database interactions.
    -   **Alternatives Considered**: PostgreSQL (a SQL database) was considered for its strong data integrity. However, MongoDB was chosen for development speed and ease of horizontal scaling.

## 2. API Design Philosophy

-   **Endpoint Structure**: The API is designed with a RESTful approach. Resources (like `courses`, `users`) are exposed via clear and intuitive endpoints.
    -   `POST /api/auth/register`: Registers a new user.
    -   `POST /api/auth/login`: Authenticates a user.
    -   `GET /api/courses`: Fetches all courses (with pagination).
    -   `GET /api/search?q=:query`: Searches for courses.
    -   `POST /api/user/enroll`: Saves a course to a user's profile (protected).
    -   `GET /api/user/courses`: Fetches a user's enrolled courses (protected).
    -   `GET /api/image-proxy?query=:category`: Fetches an image from Unsplash via the backend.

-   **API Failure Handling**: The server uses `try...catch` blocks to handle unexpected errors and returns appropriate HTTP status codes (e.g., `404 Not Found`, `400 Bad Request`, `500 Internal Server Error`) along with a clear JSON message.

-   **Authentication/Authorization Strategy**:
    -   The application uses **JSON Web Tokens (JWT)**. Upon a successful login, the server generates a token signed with a secret key (`JWT_SECRET`).
    -   The frontend stores this token. For subsequent requests to protected routes, this token is sent in the `Authorization: Bearer <token>` header.
    -   A middleware on the server-side verifies this token before granting access to the requested resources.

## 3. Performance & Scalability Considerations

-   **Handling Increased Load**: The stateless Node.js application can be easily scaled horizontally by running multiple instances behind a load balancer using a process manager like PM2.
-   **Potential Bottlenecks**:
    -   **Database Operations**: Unindexed database queries can become slow as data grows. Implementing indexing on frequently queried fields in MongoDB (like `email` in the `users` collection and `category` in `courses`) is crucial.
    -   **External API Calls**: The latency of the Unsplash API could become a bottleneck.
-   **Optimization**:
    -   **Database Queries**: Using `projection` in Mongoose to fetch only the necessary fields, reducing data transfer.
    -   **Caching**: Responses from the Unsplash API can be cached on the server-side (e.g., with Redis) to reduce the number of API calls and decrease latency. Pagination has also been implemented on the backend to limit the amount of data sent to the client.
