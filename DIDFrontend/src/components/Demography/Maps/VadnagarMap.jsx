import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const VadnagarMap = () => {
  const [vadnagarTotal, setVadnagarTotal] = useState(null);
  const [vadnagarData, setVadnagarData] = useState(null);

  useEffect(() => {
    const fetchPopsDataVadnagar = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
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
        if (response.data) {
          const vadnagarData = response.data.find(
            (entry) => entry.taluka_name === "Vadnagar"
          );
          if (vadnagarData) {
            const vadnagarTotal = vadnagarData.total_population;
            console.log("Total for Vadnagar:", vadnagarTotal);
            setVadnagarTotal(vadnagarTotal);
          } else {
            console.log("Data for Vadnagar not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchVadnagarData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          // "https://didbackend.onrender.com/getcitiesdata",
          // "http://localhost:5000/getcitiesdata/",
          `${import.meta.env.VITE_BACKEND_URL}/getcitiesdata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.data && Array.isArray(response.data.data)) {
          const vadnagarData = response.data.data.find(
            (city) => city.taluka_name === "Vadnagar"
          );

          if (vadnagarData) {
            console.log("Vadnagar data:", vadnagarData);
            setVadnagarData(vadnagarData);
          } else {
            console.log("Vadnagar data not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchVadnagarData();
    fetchPopsDataVadnagar();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto">
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <svg
            style={{ maxWidth: "400px" }}
            width=""
            height=""
            viewBox="0 0 262 185"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M248.431 8.46376C248.067 8.5092 252.322 18.9824 250.047 21.3913C246.755 24.8761 244.076 29.9769 242.146 34.3188C240.301 38.4721 239.931 43.1412 238.107 47.2463C236.064 51.8412 238.278 59.6059 237.164 64.6176C234.993 74.3891 243.164 86.0288 252.875 86.0288C256.716 86.0288 260.478 92.6169 259.697 96.1284C259.394 97.4916 253.157 102.908 251.663 102.996C249.441 103.127 247.716 102.734 245.648 102.143C243.891 101.642 241.33 101.598 239.543 100.752C235.945 99.0473 233.175 97.1106 229.039 97.3404C226.202 97.498 228.337 105.449 225 107.216C222.958 108.296 221.008 108.691 218.895 109.46C216.772 110.232 212.88 113.432 212.88 109.954C212.88 107.424 213.314 115.086 212.7 117.54C211.88 120.82 209.395 123.675 208.032 126.742C206.978 129.112 203.421 139.355 200.76 139.355C198.079 139.355 195.656 140.163 193.04 140.163C189.02 140.163 187.763 138.96 184.422 136.931C182.247 135.61 178.187 136.185 176.521 134.103C175.288 132.561 174.814 136 173 136C165.959 136 168.225 140.499 165.659 143.799C162.255 148.175 159.339 148.171 154.257 149.095C151.84 149.535 148.825 149.51 146.627 150.487C144.927 151.242 145.548 153.058 144 153.5C142.444 153.945 139.76 154.279 139.175 155.514C138.015 157.964 139.822 160.678 138 162.5C134.084 166.416 137.146 165.369 136.931 169.25C136.742 172.643 129.89 173.179 129.659 177.329C129.563 179.062 130.577 183.98 129.614 182.536C129.09 181.75 125.778 181.369 124.811 181.369C120.724 181.369 116.855 182.177 113.096 182.177C105.496 182.177 98.1094 182.685 90.5175 180.516C85.8993 179.197 91.6323 171.166 92.4926 168.801C94.2499 163.968 98.1484 161.938 98.1484 156.322C98.1484 151.778 97.6074 148.15 94.2881 144.831C91.9188 142.462 88.8378 141.279 86.4328 139.355C84.6668 137.942 84.0858 132.891 80.777 132.891C77.8324 132.891 78.4688 131.777 76.3332 130.647C73.5004 129.147 69.5232 131.445 66.6376 131.275C62.7032 131.044 63.4057 121.805 63.4057 119.335C63.4057 113.625 62.5977 107.643 62.5977 102.188C62.5977 98.9916 58.6198 93.4252 60.8022 90.6971C62.309 88.8136 57.4344 87.6448 56.5828 87.6448C53.6224 87.6448 52.0838 87.7243 50.0293 85.6697C47.4395 83.0799 45.3928 80.1523 41.9496 81.1361C40.3049 81.606 39.1752 82.7969 37.3711 82.7969C34.1118 82.7969 30.4667 82.1363 27.855 84.4578C24.8037 87.1701 24.492 89.0308 20.5833 89.2607C17.7853 89.4253 14.6286 94.4203 13.3565 96.4875C12.1062 98.5192 10.7567 100.344 9.09218 102.009C6.89213 104.209 7.6536 103.353 5.8603 101.56C3.98625 99.6857 4.42391 98.1221 4.42391 95.4102C4.42391 93.5125 2.90301 92.4924 2.80797 90.8766C2.68199 88.7349 2 86.9888 2 84.8169C2 80.5819 6.23645 75.0939 7.83533 71.3058C8.79658 69.0284 9.8289 66.6792 10.7081 64.3932C12.6862 59.2501 17.8483 53.71 23.8152 53.71C26.1874 53.71 29.8149 54.5952 31.446 52.4981C32.9301 50.59 35.963 45.7475 38.0444 44.8224C43.3872 42.4478 45.6281 37.8081 51.735 36.6978C55.2747 36.0542 57.2974 35.0376 60.8022 36.6978C63.3094 37.8854 70.1296 39.8234 72.8629 39.9752C75.632 40.1291 73.6533 40.565 76.3332 41.1605C79.2125 41.8004 80.5501 41.8729 82.8629 44.0144C84.7321 45.7451 89.8745 44.3395 92.1335 45.6303C94.2176 46.8213 95.8807 48.9873 97.7444 50.4782C101.769 53.6978 98.4353 60.3521 101.784 62.9568C104.673 65.2038 111.457 64.1738 114.712 63.4506C119.754 62.3301 117.853 53.0169 115.565 50.0742C111.147 44.3942 123.778 45.6271 124.632 44.0144C125.992 41.4444 122.17 35.2442 124.811 33.6904C126.799 32.5212 129.766 32.369 132.038 32.7477C134.674 33.187 135.358 32.6596 137.739 30.2789C140.727 27.2909 138.037 20.5833 145.011 20.5833C147.315 20.5833 149.619 20.5833 151.923 20.5833C154.894 20.5833 157.302 22.1992 159.958 22.1992C162.163 22.1992 164.538 23.795 166.646 24.4436C168.724 25.0828 170.886 24.7243 172.886 25.8351C175.833 27.4724 181.659 27.7458 185.005 27.0022C187.308 26.4905 188.342 30.2789 190.863 30.2789C192.925 30.2789 198.856 27.0022 200.76 27.0022C208.032 24.4436 202.325 15.2446 208.032 14.9275C212.26 14.6927 213.11 20.848 217.728 21.3913C220.932 21.7683 218.122 19.8743 219.748 16.9474C221.169 14.3887 221.965 13.1656 225.359 12.5485C232.787 11.1979 224.095 2 233.438 2C238.357 2 247.5 5 248.431 8.46376Z"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">Vadnagar</div>
        </CardBody>
      </Card>
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <p>{`Total population: 234123`}</p>
          <p>
            {vadnagarData ? (
              ` No of Schools: ${vadnagarData.no_of_schools}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Colleges: ${vadnagarData.no_of_colleges}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Universities: ${vadnagarData.no_of_universities}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Bus Stations: ${vadnagarData.no_of_bus_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Railway Stations: ${vadnagarData.no_of_railway_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Post Offices: ${vadnagarData.no_of_post_offices}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Police Stations: ${vadnagarData.no_of_police_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Fire Stations: ${vadnagarData.no_of_fire_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {vadnagarData ? (
              ` No of Hospitals: ${vadnagarData.no_of_hospitals}`
            ) : (
              <Spinner />
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default VadnagarMap;
