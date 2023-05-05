import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import appRoutes from "./appRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "components/Layout";

Amplify.configure(awsmobile);

function App() {
  useEffect(() => {
    console.log(Amplify);
  }, [Amplify]);
  return (
    <Layout>
      <RouterProvider router={appRoutes} />
      <ToastContainer />
    </Layout>
  );
}

export default App;
