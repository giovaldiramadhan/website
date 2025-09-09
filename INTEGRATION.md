# External API Integration Strategy

## 1. Choice of External API 

-   **API Chosen: Unsplash API**
    -   **Reasoning**: To fulfill the external API integration requirement and enrich the application's visual experience, the Unsplash API was chosen. This API provides free access to millions of high-quality images. Instead of using static assets, the application dynamically fetches relevant images for each course based on its category. This makes the interface more engaging and demonstrates the ability to interact with a third-party service.
    -   **Implementation**: A proxy endpoint (`/api/image-proxy`) was created on the backend. The frontend calls this proxy, which then communicates directly with Unsplash using a securely stored API key.

-   **Alternatives Considered: YouTube Data API**
    -   The primary alternative was the YouTube API to search for learning videos. However, the Unsplash API was selected as it could be implemented more quickly and directly improved the UI's visual quality, a key aspect of the user experience.

## 2. Error Handling Approach

1.  **Timeouts & Fallbacks**: If the Unsplash API is slow to respond or fails, the request from the backend will time out. In case of failure, the proxy endpoint sends an error status to the frontend.
2.  **Frontend Fallback**: The frontend components are designed to handle this failure gracefully. If an image URL from Unsplash cannot be fetched, the course card component automatically displays a **color gradient background** as a fallback, ensuring the UI remains functional and visually appealing.

## 3. Security Considerations

-   **API Keys**: The Unsplash **Access Key** and **Secret Key** are stored exclusively on the server as environment variables (`.env`). These keys are never exposed to the frontend code. All requests to the Unsplash API are made through the backend proxy endpoint, which acts as a secure intermediary.
-   **User Data**: No private user data is sent to the Unsplash API. The only information transmitted is the anonymous image search query (e.g., the category name like "python").
