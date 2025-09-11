import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SidebarProvider } from "./context/sidebar_context";
import { CoursesProvider } from "./context/courses_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context"; // 1. Impor UserProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 2. Bungkus semua provider lain dengan UserProvider
  <UserProvider>
    <SidebarProvider>
      <CoursesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CoursesProvider>
    </SidebarProvider>
  </UserProvider>
);