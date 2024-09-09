import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Chip,
} from "@nextui-org/react";
import axios from "axios";
// import Logo from "../../assets/Logo";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"; // Import js-cookie
import { useAuth } from "../../auth-context/auth-context";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const LoginPage = () => {
  const { setToken , setUser } = useAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const csrfToken = Cookies.get("csrftoken");

    try {
      const response = await api.post(
        "login",
        { email, password },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": csrfToken },
        }
      );

      if (response.status === 200 && response.data.success) {
        setToken(response.data.token);
        setUser(JSON.stringify(response.data.user));
        dispatch(login( response.data.user ));

        toast.success("Login successful");
        setTimeout(() => {
          navigate("/profile");
        }, 100);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-50 border m-3">
        <CardHeader className="flex items-center justify-center gap-3 bg-blue-900">
          <div className="font-semibold text-white text-xl">District Integrated Dashboard</div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              size="lg"
              type="email"
              label="Email"
              className="my-2 "
              value={email}
              variant=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              type="password"
              label="Password"
              className="my-2"
              value={password}
              variant=""
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={handleLogin}
              aria-label="Login"
              className="btn-primary w-full mt-4 bg-blue-900 text-white"
            >
              Login
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="text-justify">
            <span>Don&apos;t have an account?</span>{" "}
            <span>
              <Chip className="bg-blue-900 text-white">
                <NavLink to="/Register" className="">
                  Register
                </NavLink>
              </Chip>
            </span>
          </div>
        </CardFooter>
        <Toaster position="top-center" reverseOrder={false} />
      </Card>
    </div>
  );
};

export default LoginPage;
