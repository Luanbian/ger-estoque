import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../app/auth/login/container";
import { MainLayout } from "../app/layout";
import { HomePage } from "../app/pages/Home";
import { StockPage } from "../app/pages/Stock";
import { ProtectedRoute } from "./protectedRoutes";

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
          <Route path="/stock" element={<StockPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
