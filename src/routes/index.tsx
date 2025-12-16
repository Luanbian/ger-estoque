import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../app/auth/login/container";
import Home from "../app/page";
import { ProtectedRoute } from "./protectedRoutes";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
