import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

// Pages
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { AuthorsPage } from '../pages/authors/AuthorsPage';
import { BooksPage } from '../pages/books/BooksPage';
import { MembersPage } from '../pages/members/MembersPage';
import { TransactionPage } from '../pages/borrowing/TransactionPage';
import { IssueBookPage } from '../pages/borrowing/IssueBookPage';
import { CategoriesPage } from '../pages/categories/CategoriesPage';
import { ReservationsPage } from '../pages/reservations/ReservationsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';

// Protected Route Guard - Only allows logged-in users
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

// Public Auth Route Guard - Redirects logged-in users away from auth pages to dashboard
const PublicAuthRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Root redirect: if logged in -> /dashboard, if not -> /login */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Auth Routes */}
      <Route element={<PublicAuthRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
      </Route>

      {/* Protected Dashboard & Management Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/students" element={<MembersPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/issuing" element={<IssueBookPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

