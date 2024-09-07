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
import Logo from "../../assets/Logo";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"; // Import js-cookie

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookie

    try {
      const response = await api.post(
        "login",
        { username: email, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken, // Include CSRF token in the request headers
          },
        }
      );

      if (response.status === 200) {
        dispatch(login({ userData: response.data }));
        toast.success("Login successful");
        navigate("/");
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
      <Card className="w-96 border border-black">
        <CardHeader className="flex items-center justify-center gap-3">
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              size="lg"
              type="email"
              label="Email"
              className="my-2"
              value={email}
              variant="bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              type="password"
              label="Password"
              className="my-2"
              value={password}
              variant="bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              onClick={handleLogin}
              aria-label="Login"
              className="btn-primary w-full mt-4"
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
              <Chip>
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
