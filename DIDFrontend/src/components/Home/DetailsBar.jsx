import { Avatar } from "@nextui-org/react";
import {
  Siren,
  Plant,
  MapPinLine,
  MapTrifold,
  UsersFour,
} from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const DetailsBar = () => {
  const [agePops, setAgePops] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getAgePops = async () => {
      try {
        const res = await axios.get(
          // "https://didbackend.onrender.com/agepops",
          // "http://localhost:5000/agepops/",
          `${import.meta.env.VITE_BACKEND_URL}/agepops`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        // console.log("okay")
        // console.log(res.data);

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }
        setAgePops(res.data);
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    };

    getAgePops();
  }, [navigate]);
  // console.log(agePops);
  const selectedTalukaData = agePops.find(
    (entry) => entry.taluka_name === "Total"
  );
  const population = selectedTalukaData
    ? selectedTalukaData.total_population
    : "Data not available";

  return (
    <div className="w-full justify-around flex flex-row flex-wrap bg-slate- rounded-lg">
      <div className="flex flex-col items-center my-4">
        <Card className="">
          <CardBody className="min-w-[230px]">
            <div className="flex justify-start items-center gap-5 ">
              <div className="flex justify-center my-2">
                <Avatar
                  className="w-12 h-12 bg-white"
                  isBordered
                  color="default"
                  fallback={
                    <UsersFour size={22} color="blue-900" weight="duotone" />
                  }
                />
              </div>
              <div className="flex flex-col ">
                <p className=" text-2xl font-mono ">{population}</p>
                <span className="text-sm">Total Population</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4  ">
        <Card className="">
          <CardBody className="min-w-[230px] ">
            <div className="flex justify-start items-center gap-5 ">
              <div className="flex justify-center my-2">
                <Avatar
                  className="w-12 h-12 bg-white"
                  isBordered
                  color="default"
                  fallback={
                    <MapTrifold size={22} color="blue-900" weight="duotone" />
                  }
                />
              </div>
              <div className="flex flex-col ">
                <p className=" text-2xl font-mono ">
                  4484.10<span className="text-sm">sq km</span>
                </p>
                <span className="text-sm">Area</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4 ">
        <Card className="">
          <CardBody className="min-w-[230px] ">
            <div className="flex justify-start items-center gap-5 ">
              <div className="flex justify-center my-2">
                <Avatar
                  className="w-12 h-12 bg-white"
                  isBordered
                  color="default"
                  fallback={
                    <Siren size={22} color="blue-900" weight="duotone" />
                  }
                />
              </div>
              <div className="flex flex-col ">
                <p className=" text-2xl font-mono ">4</p>
                <span className="text-sm">Sub Divison</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4 ">
        <Card className="">
          <CardBody className="min-w-[230px] ">
            <div className="flex justify-start items-center gap-5 ">
              <div className="flex justify-center my-2">
                <Avatar
                  className="w-12 h-12 bg-white"
                  isBordered
                  color="default"
                  fallback={
                    <MapPinLine size={22} color="blue-900" weight="duotone" />
                  }
                />
              </div>
              <div className="flex flex-col ">
                <p className=" text-2xl font-mono ">10</p>
                <span className="text-sm">Talukas</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-col items-center my-4 ">
        <Card className="">
          <CardBody className="min-w-[230px] ">
            <div className="flex justify-start items-center gap-5 ">
              <div className="flex justify-center my-2">
                <Avatar
                  className="w-12 h-12 bg-white"
                  isBordered
                  color="default"
                  fallback={
                    <Plant size={22} color="blue-900" weight="duotone" />
                  }
                />
              </div>
              <div className="flex flex-col ">
                <p className=" text-2xl font-mono ">614</p>
                <span className="text-sm">Villages</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DetailsBar;
