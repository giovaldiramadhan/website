import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SingleCourse, Cart, Courses, LoginPage, RegisterPage, SearchPage, AllCoursesPage, MyCoursesPage, AboutUsPage } from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="courses" element={<AllCoursesPage />} />
          <Route path="my-courses" element={<MyCoursesPage />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="courses/:id" element={<SingleCourse />} />
          <Route path="category/:category" element={<Courses />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<AboutUsPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;