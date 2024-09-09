import MainNavbar from "./components/Home/MainNavbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
};

export default App;
