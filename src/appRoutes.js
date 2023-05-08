import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from "pages/signup";
import ConfirmSignup from "pages/confirmSignup";

const appRoutes = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
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
]);

export default appRoutes;
