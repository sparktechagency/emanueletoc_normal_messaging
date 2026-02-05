import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/auth/Login";
import ForgetPassword from "../Pages/auth/ForgetPassword";
import VerifyCode from "../Pages/auth/VerifyCode";
import SetNewPassword from "../Pages/auth/SetNewPassword";

import AdminRoute from "../ProtectedRoute/AdminRoute";
import Dashboard from "../Pages/layout/Dashboard";
import PrivacyPolicy from "../Pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/termsAndConditions/TermsAndConditions";
import Profile from "../Pages/profile/Profile";
import ErrorBoundary from "../ErrorBoundary";
import Users from "../Pages/users/Users";
import PublicTermsAndConditions from "../Pages/termsAndConditions/PublicTermsAndConditions";
import PublicPrivacyPolicy from "../Pages/privacyPolicy/PublicPrivacyPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndConditions />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/reset-password",
    element: <SetNewPassword />,
  },
  {
    path: "/privacy-policy-public",
    element: <PublicPrivacyPolicy />,
  },
  {
    path: "/terms-and-condition-public",
    element: <PublicTermsAndConditions />,
  },
]);
export default router;
