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
  Select,
  SelectItem
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"; // Import js-cookie

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState({});

  // Role options for the select field
  const roleOptions = [
    { name: "Admin", uid: "admin" },
    { name: "User", uid: "user" },
    { name: "Manager", uid: "manager" },
    { name: "Supervisor", uid: "supervisor" },
  ];

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const handleRegister = async () => {
    const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookie

    try {
      const response = await axios.post(
        "http://localhost:5000/register",  // Use the correct API endpoint
        formData,
        {
          withCredentials: true,  // Include credentials for CSRF and sessions
          headers: {
            'X-CSRFToken': csrfToken, // Include CSRF token in the request headers
          },
        },
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");  // Redirect to login
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const validateField = (field, value) => {
    let regex;
    switch (field) {
      case "username":
        return value.trim() ? [] : ["Please enter your username."];
      case "email":
        // Email validation using regex
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? [] : ["Please enter a valid email address."];
      case "password":
        regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
        if (!value.trim()) {
          return ["Please enter your password."];
        } else {
          let errors = [];
          if (!/(?=.*[a-z])/.test(value)) {
            errors.push("At least one lowercase letter. ");
          }
          if (!/(?=.*[A-Z])/.test(value)) {
            errors.push("At least one uppercase letter. ");
          }
          if (!/(?=.*\d)/.test(value)) {
            errors.push("At least one digit. ");
          }
          if (!/(?=.*[!@#$%^&*])/.test(value)) {
            errors.push("At least one special character (!@#$%^&*). ");
          }

          return errors;
        }
      case "role":
        return value.trim() ? [] : ["Please select a role."];
      case "first_name":
        return value.trim() ? [] : ["Please enter your first name."];
      case "last_name":
        return value.trim() ? [] : ["Please enter your last name."];
      default:
        return [];
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />
      <Card className="w-96 p-4 m-3">
        <CardHeader className="text-center bg-blue-900">
          <div className="font-semibold text-white text-xl">District Integrated Dashboard</div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            {Object.keys(formData).map((field) => (
              <div key={field} className="my-3">
                {field === "role" ? (
                  <Select
                    size="lg"
                    label="Role"
                    onChange={(e) => handleInputChange(e, "role")}
                    value={formData.role}
                  >
                    {roleOptions.map((option) => (
                      <SelectItem key={option.uid} value={option.uid}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </Select>
                ) : (
                  <Input
                    size="lg"
                    type={field === "email" ? "email" : "text"}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="my-2"
                    value={formData[field]}
                    onChange={(e) => handleInputChange(e, field)}
                    error={errors[field]}
                    variant=""
                  />
                )}
                {errors[field] && (
                  <div className="text-red-500">{errors[field]}</div>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={handleRegister}
              className="btn-primary w-full mt-4 bg-blue-900 text-white"
              aria-label="Register"
            >
              Register
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="text-center">
            <span>Already have an account?</span>{" "}
            <span>
              <Chip className="bg-blue-900 text-white">
                <NavLink to="/login" className="">
                  Login
                </NavLink>
              </Chip>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
