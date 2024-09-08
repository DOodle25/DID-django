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
import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthProvider } from './auth-context/auth-context';
import ProtectedRoute from "./components/Auth/ProtectedRoute"; // Import the ProtectedRoute

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={<App />}
    >
      <Route path="" element={<Home />} />
      <Route path="/population" element={<Population />} />
      <Route path="/demography" element={<Demography />} />
      <Route path="/addscheme" element={<AddSchemes />} />
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

      {/* Protected Routes */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadCSV />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Route>

    {/* Public Routes */}
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
  </>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
