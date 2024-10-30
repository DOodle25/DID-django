import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useAuth } from "../../auth-context/auth-context";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: "http://localhost:5000/",
  // baseURL: "https://didbackend.onrender.com/",
});

const LoginPage = () => {
  const { setToken, setUser } = useAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("210305105302@paruluniversity.ac.in");
  const [password, setPassword] = useState("Pd@1");
  const [isForgotPassword, setForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);
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
        dispatch(login(response.data.user));

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

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await api.post("send-otp", { email });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent to your email.");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== reNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("reset-password", {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("Password successfully reset.");
        setForgotPassword(false);
        setOtpSent(false);
        setOtp("");
        setNewPassword("");
        setReNewPassword("");
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f2f2ff]">
      <Card className="w-80 border m-3">
        <CardHeader className="flex items-center justify-center gap-3 bg-blue-900">
          {/* <div className="font-semibold text-white text-xl">
            District Integrated Dashboard
          </div> */}
          <img
              src="\District Integrated2.png"
              alt="Logo"
              style={{ width: "", height: "50px" }}
            />
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              type="password"
              label="Password"
              className="my-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: isForgotPassword && !isOtpSent ? "none" : "block",
              }}
            />
            <Button
              type="button"
              onClick={handleLogin}
              aria-label="Login"
              className="btn-primary w-full mt-4 bg-blue-900 text-white"
              style={{
                display: isForgotPassword && !isOtpSent ? "none" : "block",
              }}
            >
              Login
            </Button>
            <Button
              type="button"
              onClick={() => setForgotPassword(!isForgotPassword)}
              aria-label="Forgot Password"
              className="btn-secondary w-full mt-4"
            >
              {isForgotPassword ? "Cancel" : "Forgot Password"}
            </Button>

            {isForgotPassword && !isOtpSent && (
              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleForgotPassword}
                  aria-label="Send OTP"
                  className="btn-primary w-full mt-4 bg-blue-900 text-white"
                >
                  Send OTP
                </Button>
              </div>
            )}

            {isForgotPassword && isOtpSent && (
              <div className="mt-4">
                <Input
                  size="lg"
                  type="text"
                  label="OTP"
                  className="my-2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Input
                  size="lg"
                  type="password"
                  label="New Password"
                  className="my-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  size="lg"
                  type="password"
                  label="Confirm New Password"
                  className="my-2"
                  value={reNewPassword}
                  onChange={(e) => setReNewPassword(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={handlePasswordReset}
                  aria-label="Reset Password"
                  className="btn-primary w-full mt-4 bg-blue-900 text-white"
                >
                  Reset Password
                </Button>
              </div>
            )}
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="text-justify">
            <span>Don&apos;t have an account?</span>{" "}
            <span>
              <NavLink
                to="/Register"
                className="bg-blue-900 text-white rounded-lg px-2 pb-1"
              >
                Register
              </NavLink>
            </span>
          </div>
        </CardFooter>
        <Toaster position="top-center" reverseOrder={false} />
      </Card>
    </div>
  );
};

export default LoginPage;
