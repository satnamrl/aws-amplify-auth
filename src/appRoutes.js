import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from "pages/signup";
import ConfirmSignup from "pages/confirmSignup";
import Signin from "pages/login";
import Dashboard from "pages/dashboard";
import ForgotPassword from "pages/forgetPassword";
import ResetPassword from "pages/resetPassword";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="/signin">Click To Login</Link>
      </div>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/confirm-signup",
    element: <ConfirmSignup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default appRoutes;
