import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../app/auth/login/container";
import { MainLayout } from "../app/layout";
import { HomePage } from "../app/pages/Home";
import { Stock } from "../app/pages/Stock/layout";
import { ProtectedRoute } from "./protectedRoutes";
import { Category } from "../app/pages/Category/layout";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/category" element={<Category />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
