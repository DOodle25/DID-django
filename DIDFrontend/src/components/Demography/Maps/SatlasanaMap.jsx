import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const SatlasanaMap = () => {
  const [satlasanaTotal, setSatlasanaTotal] = useState(null);
  const [satlasanaData, setSatlasanaData] = useState(null);

  useEffect(() => {
    const fetchPopsDataSatlasana = async () => {
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
          const satlasanaData = response.data.find(
            (entry) => entry.taluka_name === "Satlasana"
          );
          if (satlasanaData) {
            const satlasanaTotal = satlasanaData.total_population;
            console.log("Total for Satlasana:", satlasanaTotal);
            setSatlasanaTotal(satlasanaTotal);
          } else {
            console.log("Data for Satlasana not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchSatlasanaData = async () => {
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
          const satlasanaData = response.data.data.find(
            (city) => city.taluka_name === "Satlasana"
          );

          if (satlasanaData) {
            console.log("Satlasana data:", satlasanaData);
            setSatlasanaData(satlasanaData);
          } else {
            console.log("Satlasana data not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchSatlasanaData();
    fetchPopsDataSatlasana();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto">
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <svg
            style={{ maxWidth: "400px" }}
            width=""
            height=""
            viewBox="0 0 214 189"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M162.5 185C159.5 191.5 157.875 179.263 159.5 177.457C161.867 174.826 168.231 169.206 171.953 169.206C176.471 169.206 184.329 162.741 184.329 158.204C184.329 150.91 182 143.246 183.464 136.659C184.45 132.222 194.342 124.349 198.54 123.417C200.59 122.961 203.959 117.773 204.448 115.573C205.219 112.103 204.499 107.674 204.499 104.113C204.499 96.4308 200.176 88.4638 206.536 81.3967C209.114 78.5325 212.088 78.1822 211.833 73.8586C211.688 71.3858 208.818 68.578 208.115 66.1168C207.679 64.5893 204.921 64.5636 204.55 63.2645C204.093 61.6671 202.764 60.0564 202.665 58.2731C202.321 52.0756 199.245 56.6215 194.923 57.4072C190.795 58.1578 189.874 62.9838 184.839 60.1067C180.706 57.7452 177.703 60.4637 174.958 55.5227C173.174 52.3115 172.241 49.6384 170.781 46.3547C168.897 42.1145 168.055 42.7888 163.701 40.8539C159.73 39.0889 159.12 33.6166 157.284 30.3108C155.461 27.0302 153.476 26.9101 151.121 24.5553C148.011 21.445 148.218 18.2092 146.282 14.7252C144.649 11.7852 143.285 5.73019 143.074 2.34846C143.041 1.82503 139.438 2.40427 138.49 2.34846C136.502 2.23154 135.642 1.42283 134.109 4.18205C131.376 9.10255 128.52 12.9813 126.571 18.3415C124.833 23.121 122.19 25.2684 117.403 25.2684C115.57 25.2684 113.736 25.2684 111.902 25.2684C109.812 25.2684 108.662 27.102 106.86 27.102C105.871 27.102 102.175 28.5816 101.869 27.5094C101.556 26.4138 101.25 23.1638 100.442 22.518C97.3212 20.021 98.3559 15.925 98.1505 12.4332C98.0669 11.0119 97.2337 9.64542 97.2337 7.84924C97.2337 4.96438 95.7042 6.6102 94.0249 6.98337C89.3197 8.02897 86.7362 9.11706 83.278 12.2295C82.4845 12.9436 79.2139 13.4466 77.9809 14.0631C75.441 15.3331 73.4932 17.5252 72.6839 20.2769C71.5902 23.9955 69.4528 28.1313 66.0626 30.3108C61.4661 33.2657 56.2753 33.3233 51.0373 34.4873C46.7703 35.4355 44.3874 36.7281 40.596 33.3158C38.7312 31.6375 34.8758 27.2539 32.1411 27.102C26.8537 26.8082 21.7347 28.8792 18.3891 33.0612C16.8495 34.9857 14.3757 35.6533 13.8561 38.511C13.5356 40.2736 13.0346 42.1338 11.7678 43.4006C8.83275 46.3357 1.88678 51.7773 1.88678 55.9811C1.88678 57.0671 9.10389 55.1107 5 58.5C9.10389 55.1107 10.799 57.289 11.7678 58.5C13.9712 61.2543 14.0168 64.393 16.3518 66.728C17.4218 67.798 20.9034 77.424 18.8475 77.424C16.2497 77.424 26.3181 74.9481 26.6403 77.5258C27.1173 81.3416 28.1329 85.0515 26.844 89.2404C25.8638 92.4263 28.4739 96.7128 28.4739 99.9873C28.4739 101.764 29.2285 110.183 31.428 107.984C33.4887 105.923 38.0437 105.03 40.8507 105.03C51.0682 105.03 47.7266 115.024 47.7266 122.449C47.7266 127.007 53.6866 123.703 55.9778 121.532C62.2945 115.548 62.4271 124.042 66.0626 125.658C69.2555 127.077 66.903 126.755 70.1372 126.167C71.9715 125.833 73.9931 126.6 75.6889 125.658C77.9027 124.428 80.9754 128.293 82.3612 129.987C83.8027 131.749 87.1489 137.18 87.1489 139.41C87.1489 142.747 91.533 144.722 91.7329 148.119C91.8883 150.761 95.2496 152.96 97.0299 154.741C99.8453 157.556 98.8616 164.1 102.276 165.997C108.222 169.3 113.817 177.457 121.529 177.457C125.213 177.457 128.32 177.221 131.614 176.489C133.255 176.124 137.978 178.862 139.5 178.17C141.989 177.038 142.727 177.016 144.907 178.17C147.893 179.75 150.908 180.964 154.5 178.17C158.448 175.099 160.589 177.399 165.077 174.706"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">Satlasana</div>
        </CardBody>
      </Card>
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <p>{`Total population: 234123`}</p>
          <p>
            {satlasanaData ? (
              ` No of Schools: ${satlasanaData.no_of_schools}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Colleges: ${satlasanaData.no_of_colleges}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Universities: ${satlasanaData.no_of_universities}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Bus Stations: ${satlasanaData.no_of_bus_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Railway Stations: ${satlasanaData.no_of_railway_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Post Offices: ${satlasanaData.no_of_post_offices}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Police Stations: ${satlasanaData.no_of_police_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Fire Stations: ${satlasanaData.no_of_fire_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {satlasanaData ? (
              ` No of Hospitals: ${satlasanaData.no_of_hospitals}`
            ) : (
              <Spinner />
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default SatlasanaMap;
