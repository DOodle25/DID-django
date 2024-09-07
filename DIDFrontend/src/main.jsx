import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./components/Home/Home.jsx";
import Population from "./components/Population/Population.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
import RegisterPage from "./components/Auth/RegisterPage.jsx";
import UploadCSV from "./components/Utils/UploadCSV.jsx";
import UserProfile from "./components/Auth/UserProfile.jsx";
import Demography from "./components/Demography/Demography.jsx";
import AddSchemes from "./components/Schemes/AddSchemes.jsx";
import VisnagarMap from "./components/Demography/Maps/VisnagarMap.jsx";
import SatlasanaMap from "./components/Demography/Maps/SatlasanaMap.jsx";
import KheraluMap from "./components/Demography/Maps/KheraluMap.jsx";
import KadiMap from "./components/Demography/Maps/KadiMap.jsx";
import MahesanaMap from "./components/Demography/Maps/MahesanaMap.jsx";
import BechrajiMap from "./components/Demography/Maps/BechrajiMap.jsx";
import JotanaMap from "./components/Demography/Maps/JotanaMap.jsx";
import VadnagarMap from "./components/Demography/Maps/VadnagarMap.jsx";
import VijapurMap from "./components/Demography/Maps/VijapurMap.jsx";
import UnjhaMap from "./components/Demography/Maps/UnjhaMap.jsx";
// import AuthLayout from "./components/Utils/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

// import Temp1 from "./components/Dump/Temp1.jsx";

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={
        // <AuthLayout authentication={true}>
        <App />
        // </AuthLayout>
      }
    >
      <Route path="" element={<Home />} />
      <Route path="/population" element={<Population />} />
      <Route path="/upload" element={<UploadCSV />} />
      <Route path="/demography" element={<Demography />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/visnagar" element={<VisnagarMap />} />
      <Route path="/kheralu" element={<KheraluMap />} />
      <Route path="/satlasana" element={<SatlasanaMap />} />
      <Route path="/kadi" element={<KadiMap />} />
      <Route path="/bechraji" element={<BechrajiMap />} />
      <Route path="/mahesana" element={<MahesanaMap />} />
      <Route path="/jotana" element={<JotanaMap />} />
      <Route path="/unjha" element={<UnjhaMap />} />
      <Route path="/vadnagar" element={<VadnagarMap />} />
      <Route path="/vijapur" element={<VijapurMap />} />
      {/* <Route path="/temp1" element={<KheraluMap />} /> */}
      <Route path="/addscheme" element={<AddSchemes />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
  </>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
