import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../app/auth/login/container";
import { MainLayout } from "../app/layout";
import { HomePage } from "../app/pages/Home";
import { Stock } from "../app/pages/Stock/layout";
import { ProtectedRoute } from "./protectedRoutes";
import { Category } from "../app/pages/Category/layout";
import { Finance } from "../app/pages/Finance/layout";
import { ForgotPassword } from "../app/auth/forgotPassword/container";
import { ResetPassword } from "../app/auth/resetPassword/container";
import { RegisterAccount } from "../app/registerAccount/container";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<RegisterAccount />} />
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
          <Route path="/finance" element={<Finance />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
