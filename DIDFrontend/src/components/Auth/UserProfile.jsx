import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Button,
  Spacer,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "",
    password: "",
    new_password: "",
    re_newpassword: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`
          // "http://localhost:5000/profile"
          // "https://didbackend.onrender.com/profile"
          , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }

        setData(res.data);
        setData((prevData) => ({ ...prevData, password: "" }));
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/profile/update`
        // "http://localhost:5000/profile/update"
        // "https://didbackend.onrender.com/profile/update"
        , {
        headers: {
          Authorization: `Bearer ${token}`,
          user: data,
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        // "http://localhost:5000/logout",
        // "https://didbackend.onrender.com/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("token");
        alert("Logout successful");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to log out");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card shadow className="border w-[800px] m-3">
        <CardHeader className="bg-blue-900 text-white">
          <h2 className="text-2xl font-bold ">User Profile</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                label="Last Name"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                label="Username"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                label="New Password"
                type="password"
                name="new_password"
                value={data.new_password}
                onChange={handleChange}
                className="mb-4"
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                label="Role"
                name="role"
                value={data.role}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                label="Current Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                label="Re-enter New Password"
                type="password"
                name="re_newpassword"
                value={data.re_newpassword}
                onChange={handleChange}
                className="mb-4"
              />
            </div>
          </div>
          <Spacer y={2} />
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdate}
              className="btn-primary mt-4 bg-blue-900 text-white"
            >
              Update Profile
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              className="btn-primary mt-4 bg-red-600 text-white ml-4"
            >
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
