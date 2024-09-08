import MainNavbar from "./components/Home/MainNavbar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from './auth-context/auth-context';

const App = () => {
  return (
    <>
    {/* // <AuthProvider> */}
      <MainNavbar />
      <Outlet />
    {/* // </AuthProvider> */}
    </>
  );
};

export default App;
