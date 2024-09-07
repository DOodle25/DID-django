// AddSchemes.jsx
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider, Input } from "@nextui-org/react";
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

  const handleAddScheme = async () => {
    try {
      const response = await axios.post(
        // "https://myapp.vercel.app/addScheme"
        "http://localhost:5000/addScheme"
        ,
        {
          schemename,
          ministry,
          desc,
          place,
          moneygranted,
          moneyspent,
          status,
          leadperson,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
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
      <Card className="w-96 border border-black ">
        <CardHeader className="flex gap-3">
          <div className="text-xl font-bold">Add Scheme</div>
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
            <Input
              size="lg"
              type="text"
              label="Ministry"
              className="my-2"
              value={ministry}
              onChange={(e) => setMinistry(e.target.value)}
            />
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
              label="Place"
              className="my-2"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
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
            <Input
              size="lg"
              type="text"
              label="Status"
              className="my-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
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
              onClick={handleAddScheme}
              className="btn-primary"
              aria-label="Register"
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
