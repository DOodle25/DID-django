// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
// import { NextUIProvider } from "@nextui-org/react";
// import Home from "./components/Home/Home.jsx";
// import Population from "./components/Population/Population.jsx";
// import LoginPage from "./components/Auth/LoginPage.jsx";
// import RegisterPage from "./components/Auth/RegisterPage.jsx";
// import UserProfile from "./components/Auth/UserProfile.jsx";
// import Demography from "./components/Demography/Demography.jsx";
// import AddSchemes from "./components/Schemes/AddSchemes.jsx";
// import VisnagarMap from "./components/Demography/Maps/VisnagarMap.jsx";
// import SatlasanaMap from "./components/Demography/Maps/SatlasanaMap.jsx";
// import KheraluMap from "./components/Demography/Maps/KheraluMap.jsx";
// import KadiMap from "./components/Demography/Maps/KadiMap.jsx";
// import MahesanaMap from "./components/Demography/Maps/MahesanaMap.jsx";
// import BechrajiMap from "./components/Demography/Maps/BechrajiMap.jsx";
// import JotanaMap from "./components/Demography/Maps/JotanaMap.jsx";
// import VadnagarMap from "./components/Demography/Maps/VadnagarMap.jsx";
// import VijapurMap from "./components/Demography/Maps/VijapurMap.jsx";
// import UnjhaMap from "./components/Demography/Maps/UnjhaMap.jsx";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { AuthProvider } from './auth-context/auth-context';
// import ProtectedRoute from "./components/Auth/ProtectedRoute"; // Import the ProtectedRoute
// import SchemeDetails from "./components/Schemes/SchemeID.jsx";
// const routes = createRoutesFromElements(
//   <>
//     {/* Public Routes */}
//     <Route path="/register" element={<RegisterPage />} />
//     <Route path="/login" element={<LoginPage />} />

//     {/* Protected Routes */}
//     <Route
//       path="/"
//       element={
//         <ProtectedRoute>
//           <App />
//         </ProtectedRoute>
//       }
//     >
//       <Route path="/scheme/:id" element={<SchemeDetails />} />
//       <Route path="/" element={<Home />} />
//       <Route path="/population" element={<Population />} />
//       <Route path="/demography" element={<Demography />} />
//       <Route path="/addscheme" element={<AddSchemes />} />
//       <Route path="/profile" element={<UserProfile />} />
//       <Route path="/visnagar" element={<VisnagarMap />} />
//       <Route path="/kheralu" element={<KheraluMap />} />
//       <Route path="/satlasana" element={<SatlasanaMap />} />
//       <Route path="/kadi" element={<KadiMap />} />
//       <Route path="/bechraji" element={<BechrajiMap />} />
//       <Route path="/mahesana" element={<MahesanaMap />} />
//       <Route path="/jotana" element={<JotanaMap />} />
//       <Route path="/unjha" element={<UnjhaMap />} />
//       <Route path="/vadnagar" element={<VadnagarMap />} />
//       <Route path="/vijapur" element={<VijapurMap />} />
//     </Route>
//   </>
// );

// const router = createBrowserRouter(routes);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <Provider store={store}>
//         <NextUIProvider>
//           <RouterProvider router={router} />
//         </NextUIProvider>
//       </Provider>
//     </AuthProvider>
//   </React.StrictMode>
// );






















// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { HashRouter, Routes, Route } from "react-router-dom";
// import { NextUIProvider } from "@nextui-org/react";
// import Home from "./components/Home/Home.jsx";
// import Population from "./components/Population/Population.jsx";
// import LoginPage from "./components/Auth/LoginPage.jsx";
// import RegisterPage from "./components/Auth/RegisterPage.jsx";
// import UserProfile from "./components/Auth/UserProfile.jsx";
// import Demography from "./components/Demography/Demography.jsx";
// import AddSchemes from "./components/Schemes/AddSchemes.jsx";
// import VisnagarMap from "./components/Demography/Maps/VisnagarMap.jsx";
// import SatlasanaMap from "./components/Demography/Maps/SatlasanaMap.jsx";
// import KheraluMap from "./components/Demography/Maps/KheraluMap.jsx";
// import KadiMap from "./components/Demography/Maps/KadiMap.jsx";
// import MahesanaMap from "./components/Demography/Maps/MahesanaMap.jsx";
// import BechrajiMap from "./components/Demography/Maps/BechrajiMap.jsx";
// import JotanaMap from "./components/Demography/Maps/JotanaMap.jsx";
// import VadnagarMap from "./components/Demography/Maps/VadnagarMap.jsx";
// import VijapurMap from "./components/Demography/Maps/VijapurMap.jsx";
// import UnjhaMap from "./components/Demography/Maps/UnjhaMap.jsx";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { AuthProvider } from './auth-context/auth-context';
// import ProtectedRoute from "./components/Auth/ProtectedRoute"; 
// import SchemeDetails from "./components/Schemes/SchemeID.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <Provider store={store}>
//         <NextUIProvider>
//           <HashRouter>
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/login" element={<LoginPage />} />

//               {/* Protected Routes */}
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute>
//                     <App />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route path="/scheme/:id" element={<SchemeDetails />} />
//                 <Route path="/" element={<Home />} />
//                 <Route path="/population" element={<Population />} />
//                 <Route path="/demography" element={<Demography />} />
//                 <Route path="/addscheme" element={<AddSchemes />} />
//                 <Route path="/profile" element={<UserProfile />} />
//                 <Route path="/visnagar" element={<VisnagarMap />} />
//                 <Route path="/kheralu" element={<KheraluMap />} />
//                 <Route path="/satlasana" element={<SatlasanaMap />} />
//                 <Route path="/kadi" element={<KadiMap />} />
//                 <Route path="/bechraji" element={<BechrajiMap />} />
//                 <Route path="/mahesana" element={<MahesanaMap />} />
//                 <Route path="/jotana" element={<JotanaMap />} />
//                 <Route path="/unjha" element={<UnjhaMap />} />
//                 <Route path="/vadnagar" element={<VadnagarMap />} />
//                 <Route path="/vijapur" element={<VijapurMap />} />
//               </Route>
//             </Routes>
//           </HashRouter>
//         </NextUIProvider>
//       </Provider>
//     </AuthProvider>
//   </React.StrictMode>
// );


















import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./components/Home/Home.jsx";
import Population from "./components/Population/Population.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
import RegisterPage from "./components/Auth/RegisterPage.jsx";
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
import ProtectedRoute from "./components/Auth/ProtectedRoute"; 
import SchemeDetails from "./components/Schemes/SchemeID.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <NextUIProvider>
          <HashRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <App />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} /> {/* Default route */}
                <Route path="scheme/:id" element={<SchemeDetails />} />
                <Route path="population" element={<Population />} />
                <Route path="demography" element={<Demography />} />
                <Route path="addscheme" element={<AddSchemes />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="visnagar" element={<VisnagarMap />} />
                <Route path="kheralu" element={<KheraluMap />} />
                <Route path="satlasana" element={<SatlasanaMap />} />
                <Route path="kadi" element={<KadiMap />} />
                <Route path="bechraji" element={<BechrajiMap />} />
                <Route path="mahesana" element={<MahesanaMap />} />
                <Route path="jotana" element={<JotanaMap />} />
                <Route path="unjha" element={<UnjhaMap />} />
                <Route path="vadnagar" element={<VadnagarMap />} />
                <Route path="vijapur" element={<VijapurMap />} />
                <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all route */}
              </Route>
            </Routes>
          </HashRouter>
        </NextUIProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
