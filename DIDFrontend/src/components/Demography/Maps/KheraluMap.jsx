import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const KheraluMap = () => {
  const [kheraluTotal, setKheraluTotal] = useState(null);
  const [kheraluData, setKheraluData] = useState(null);

  useEffect(() => {
    const fetchPopsDataKheralu = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://didbackend.onrender.com/agepops",
          // "http://:5000/agepops/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.data) {
          const kheraluData = response.data.find(
            (entry) => entry.taluka_name === "Kheralu"
          );
          if (kheraluData) {
            const kheraluTotal = kheraluData.total_population;
            console.log("Total for Kheralu:", kheraluTotal);
            setKheraluTotal(kheraluTotal);
          } else {
            console.log("Data for Kheralu not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchKheraluData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://didbackend.onrender.com/getcitiesdata",
          // "http://:5000/getcitiesdata/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.data && Array.isArray(response.data.data)) {
          const kheraluData = response.data.data.find(
            (city) => city.taluka_name === "Kheralu"
          );

          if (kheraluData) {
            console.log("Kheralu data:", kheraluData);
            setKheraluData(kheraluData);
          } else {
            console.log("Kheralu data not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchKheraluData();
    fetchPopsDataKheralu();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto">
      <Card className="flex justify-center max-w-md w-full mb-2k">
        <CardBody>
          <svg
            style={{ maxWidth: "400px" }}
            width="400"
            height=""
            viewBox="0 0 290 155"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.47201 95.4848C2.17946 98.1178 1.75823 96.146 2.99174 93.9256C4.39724 91.3957 2.62441 88.1421 4.03121 85.6099C5.57691 82.8276 7.02658 75.4176 9.22854 73.656C12.0441 71.4036 7.84963 63.6586 10.5567 60.9514C13.0655 58.4426 18.0359 61.3761 20.1429 63.2614C23.4058 66.1807 25.8484 61.9094 28.4587 60.374C30.8633 58.9595 30.9852 58.064 34.1757 58.064C36.8346 58.064 39.2245 58.1796 41.452 56.4471C45.7367 53.1145 47.5476 47.3492 53.9256 48.7666C56.8462 49.4156 57.5637 52.494 57.5637 54.9456C57.5637 56.1877 55.3738 60.9346 58.6032 58.064C62.4989 54.6012 72.5497 53.232 77.3136 55.7541C80.7856 57.5922 82.9899 61.1824 87.1886 61.1824C89.6776 61.1824 91.0853 62.2219 93.4254 62.2219C96.6005 62.2219 94.9843 59.3116 96.5438 58.064C97.9405 56.9466 97.5256 54.1082 99.1424 53.0977C101.033 51.916 101.668 49.524 102.492 47.6694C103.675 45.0069 104.507 43.3966 104.34 40.3931C104.176 37.4533 100.182 38.4189 100.182 35.1958C100.182 31.1163 103.3 26.9332 103.3 22.2024C103.3 20.2923 100.615 18.1794 103.82 17.4671C106.214 16.9351 108.835 16.451 111.096 15.4459C115.838 13.3384 115.727 6.67715 121.202 11.057C123.544 12.9306 125.996 9.83701 126.977 8.16962C128.353 5.83041 131.053 6.09069 133.445 6.09069C135.988 6.09069 144.359 6.48055 145.918 4.53149C147.647 2.3712 152.101 10.7404 155.793 8.68936C159.523 6.61741 164.19 6.44159 167.516 3.78076C173.152 -0.727596 177.268 6.29452 174.792 11.8655C172.9 16.1226 175.168 20.6432 179.701 20.6432C182.03 20.6432 183.93 17.6403 185.996 17.6403C188.249 17.6403 188.97 20.6432 191.135 20.6432C196.476 20.6432 193.228 29.3908 199.74 23.5306C204.094 19.612 206.894 18.8094 209.557 24.8011C211.745 29.7245 211.039 32.3996 214.523 36.755C217.372 40.3157 220.002 41.9397 222.319 46.1102C224.599 50.2146 223.561 54.1664 227.228 57.833C230.314 60.9188 229.44 64.7716 234.273 67.1882C238.999 69.5511 241.048 71.5771 246.747 71.5771C253.426 71.5771 257.367 75.7119 263.898 76.7167C271.41 77.8724 287.286 70.6045 287.286 83.531C287.286 85.9025 288.995 95.3231 286.246 95.4848C282.88 95.6829 276.915 90.773 274.581 88.4396C271.938 85.7963 268.449 90.3067 267.016 92.8862C266.154 94.4385 265.774 97.4364 265.399 99.123C264.761 101.994 260.754 101.811 260.318 103.339C259.67 105.606 261.464 107.958 258.181 107.958C255.648 107.958 254.947 107.381 253.214 105.649C249.848 102.282 245.977 101.644 243.859 105.88C241.867 109.864 236.573 114.102 232.772 116.274C230.606 117.512 230.573 119.461 228.498 116.794C226.782 114.587 224.919 114.195 222.319 114.195C219.391 114.195 220.5 116.274 216.833 114.769C213.5 114.195 212.645 115 210.365 115C208.384 115 205.022 112.876 203.898 111.077C202.557 108.932 201.492 107.958 198.931 107.958C195.986 107.958 193.041 107.958 190.096 107.958C187.292 107.958 186.804 105.88 183.859 105.88C177.589 105.88 179.417 118.222 174.504 120.952C169.371 123.803 166.02 116.897 162.781 124.59C161.776 126.977 162.454 131.385 160.702 133.137C159.054 134.784 156.106 134.203 154.465 136.255C152.203 139.083 153.025 144.204 155.793 146.419C160.516 150.197 149.409 152.656 147.478 152.656C144.623 152.656 144.222 154.569 142.5 152.656C140.678 150.632 138.06 148.651 136.794 147.227C135.669 145.961 139.749 141.046 138.411 139.373C137.572 138.324 135.588 135.123 134.484 134.985C131.332 134.591 123.3 134.257 120.971 131.346C119.861 129.959 118.082 128.163 116.294 127.766C114.603 127.39 110.691 128.63 109.537 127.189C107.207 124.276 100.472 125.83 97.0635 125.629C95.155 125.517 94.3816 123.55 91.8661 123.55C89.6892 123.55 87.0071 125.104 84.8209 125.86C80.0382 127.516 78.0062 131.78 74 134.985C71.0835 137.318 66.7544 138.191 65.3597 140.702C64.0056 143.139 55.9861 145.418 53.6369 143.069C50.5264 139.959 51.8719 134.083 48.2085 130.827C44.3953 127.437 39.5469 132.713 35.2152 130.307C32.6114 128.86 22.1207 128.919 19.6232 130.307C15.1981 132.765 10.0016 129.15 9.74828 124.59C9.56927 121.368 9.50261 119.114 9.74828 116.043C9.9608 113.387 12.1502 111.261 11.0187 108.998C9.98022 106.921 9.18945 104.568 7.43835 102.992C6.18019 101.86 2.58847 100.583 2.47201 98.6032C1.96472 89.9794 4.26563 82.9704 6.62988 74.6955"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">Kheralu</div>
        </CardBody>
      </Card>
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <p>
            {kheraluTotal ? `Total population: ${kheraluTotal}` : <Spinner />}
          </p>
          <p>
            {kheraluData ? (
              ` No of Schools: ${kheraluData.no_of_schools}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Colleges: ${kheraluData.no_of_colleges}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Universities: ${kheraluData.no_of_universities}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Bus Stations: ${kheraluData.no_of_bus_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Railway Stations: ${kheraluData.no_of_railway_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Post Offices: ${kheraluData.no_of_post_offices}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Police Stations: ${kheraluData.no_of_police_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Fire Stations: ${kheraluData.no_of_fire_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {kheraluData ? (
              ` No of Hospitals: ${kheraluData.no_of_hospitals}`
            ) : (
              <Spinner />
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default KheraluMap;
