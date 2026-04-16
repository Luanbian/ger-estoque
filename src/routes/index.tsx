import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../app/auth/login/container";
import { MainLayout } from "../app/layout";
import { HomePage } from "../app/pages/Home";
import { Stock } from "../app/pages/Stock/layout";
import { ProtectedRoute } from "./protectedRoutes";
import { Category } from "../app/pages/Category/layout";
import { Finance } from "../app/pages/Finance/layout";
import RequireFeature from "./RequiredFeatures";
import { Features } from "../features/common/featuresEnum";
import { ForgotPassword } from "../app/auth/forgotPassword/container";
import { ResetPassword } from "../app/auth/resetPassword/container";
import { RegisterAccount } from "../app/registerAccount/container";
import { Profile } from "../app/pages/Profile/layout";
import { Sales } from "../app/pages/Sales/layout";
import { Customer } from "../app/pages/Customer/layout";
import { Showcase } from "../app/pages/Showcase/layout";
import { Sale } from "../app/pages/Sale/layout";
import { Catalog } from "../app/pages/Catalog/layout";
import { Whatsapp } from "../app/pages/Whatsapp/layout";

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
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/showcase"
            element={
              <RequireFeature feature={Features.SHOWCASE}>
                <Showcase />
              </RequireFeature>
            }
          />
          <Route path="/sale" element={<Sale />} />
          <Route
            path="/finance"
            element={
              <RequireFeature feature={Features.FINANCIAL_DASHBOARD}>
                <Finance />
              </RequireFeature>
            }
          />
          <Route
            path="/sales"
            element={
              <RequireFeature feature={Features.SALES_REPORTS}>
                <Sales />
              </RequireFeature>
            }
          />
          <Route
            path="/customers"
            element={
              <RequireFeature feature={Features.CUSTOMER_MANAGEMENT}>
                <Customer />
              </RequireFeature>
            }
          />
          <Route
            path="/catalog"
            element={
              <RequireFeature feature={Features.SHOWCASE}>
                <Catalog />
              </RequireFeature>
            }
          />
          <Route
            path="/whatsapp"
            element={
              <RequireFeature feature={Features.WHATSAPP}>
                <Whatsapp />
              </RequireFeature>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
