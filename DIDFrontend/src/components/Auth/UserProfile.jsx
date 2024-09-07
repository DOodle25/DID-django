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
  const [data, setData] = useState(null);

  useEffect(() => {
    const callTemp = async () => {
      try {
        const res = await axios.get("http://localhost:5000/temp", { withCredentials: true });

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }

        setData(res.data);
      } catch (err) {
        navigate("/login");
        console.error(err);
      }
    };

    callTemp();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card shadow className="border border-black w-[800px]">
        <CardHeader>
          <h2 className="text-2xl font-bold">User Profile</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {data && (
                <Input
                  label="First Name"
                  defaultValue={data.user.firstName}
                  className="mb-4"
                  readOnly
                  variant="bordered"
                />
              )}
              {data && (
                <Input
                  label="Last Name"
                  defaultValue={data.user.lastName}
                  className="mb-4"
                  variant="bordered"
                />
              )}
              {data && (
                <Input
                  label="Username"
                  defaultValue={data.user.username}
                  className="mb-4"
                  variant="bordered"
                />
              )}
            </div>
            <div>
              {data && (
                <Input
                  label="Email"
                  type="email"
                  defaultValue={data.user.email}
                  className="mb-4"
                  variant="bordered"
                />
              )}
              {data && (
                <Input
                  label="Role"
                  defaultValue={data.user.role}
                  className="mb-4"
                  variant="bordered"
                />
              )}
            </div>
          </div>
          <Spacer y={2} />
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="success"
              onClick={() => console.log("Update profile")}
            >
              Update Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
