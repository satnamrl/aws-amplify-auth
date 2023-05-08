import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from "pages/signup";
import ConfirmSignup from "pages/confirmSignup";
import Signin from "pages/login";

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
]);

export default appRoutes;
