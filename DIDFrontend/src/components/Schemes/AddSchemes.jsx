import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSchemes = () => {
  const [schemename, setSchemeName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [desc, setDesc] = useState("");
  const [place, setPlace] = useState("");
  const [moneygranted, setMoneyGranted] = useState("");
  const [moneyspent, setMoneySpent] = useState("");
  const [status, setStatus] = useState("");
  const [leadperson, setLeadPerson] = useState("");
  const navigate = useNavigate();

  const ministryOptions = [
    { name: "Ministry of Education", uid: "education" },
    { name: "Ministry of Health", uid: "health" },
    { name: "Ministry of Finance", uid: "finance" },
  ];

  const placeOptions = [
    { name: "Urban", uid: "urban" },
    { name: "Rural", uid: "rural" },
  ];

  const statusOptions = [
    { name: "Approved", uid: "Approved" },
    { name: "Pending Approval", uid: "Pending Approval" },
    { name: "In Progress", uid: "In Progress" },
    { name: "Completed", uid: "Completed" },
    { name: "Pending", uid: "Pending" },
  ];

  const handleAddScheme = async () => {
    try {
      const lasteditedby = JSON.parse(localStorage.getItem("user")).email;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        // "http://localhost:5000/addScheme/",
        // "https://didbackend.onrender.com/addScheme/",
        `${import.meta.env.VITE_BACKEND_URL}/addScheme`,
        {
          schemename,
          ministry,
          desc,
          place,
          moneygranted,
          moneyspent,
          status,
          leadperson,
          lasteditedby,
        },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Scheme added successfully!");
        navigate("/");
      } else if (response.status === 401) {
        toast.error("Unauthorized");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding scheme");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen scroll-m-0">
      <div>
        <Toaster />
      </div>
      <Card className="w-96 border border-black">
        <CardHeader className="flex gap-3 bg-blue-900">
          <div className="text-xl font-bold text-white">Add Scheme</div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              size="lg"
              type="text"
              label="Scheme Name"
              className="my-2"
              value={schemename}
              onChange={(e) => setSchemeName(e.target.value)}
            />
            <Select
              size="lg"
              label="Ministry"
              className="my-2"
              value={ministry}
              onChange={(e) => setMinistry(e.target.value)}
            >
              {ministryOptions.map((option) => (
                <SelectItem key={option.uid} value={option.uid}>
                  {option.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              size="lg"
              label="Place"
              className="my-2"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            >
              {placeOptions.map((option) => (
                <SelectItem key={option.uid} value={option.uid}>
                  {option.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              size="lg"
              type="text"
              label="Description"
              className="my-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Fund Granted"
              className="my-2"
              value={moneygranted}
              onChange={(e) => setMoneyGranted(e.target.value)}
            />
            <Input
              size="lg"
              type="text"
              label="Fund Spent"
              className="my-2"
              value={moneyspent}
              onChange={(e) => setMoneySpent(e.target.value)}
            />
            <Select
              size="lg"
              label="Status"
              className="my-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <SelectItem key={option.uid} value={option.uid}>
                  {option.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              size="lg"
              type="text"
              label="Lead Person"
              className="my-2"
              value={leadperson}
              onChange={(e) => setLeadPerson(e.target.value)}
            />
            <button
              type="button"
              className="btn-primary bg-blue-900 rounded-xl mb-2 px-4 text-white hover:bg-blue-800 w-full mt-4 py-2"
              onClick={handleAddScheme}
              aria-label="Add Scheme"
            >
              Add Scheme
            </button>
          </form>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
};

export default AddSchemes;
