import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const JotanaMap = () => {
  const [jotanaTotal, setJotanaTotal] = useState(null);
  const [jotanaData, setJotanaData] = useState(null);

  useEffect(() => {
    const fetchPopsDataJotana = async () => {
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
          const jotanaData = response.data.find(
            (entry) => entry.taluka_name === "Jotana"
          );
          if (jotanaData) {
            const jotanaTotal = jotanaData.total_population;
            console.log("Total for Jotana:", jotanaTotal);
            setJotanaTotal(jotanaTotal);
          } else {
            console.log("Data for Jotana not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchJotanaData = async () => {
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
          const jotanaData = response.data.data.find(
            (city) => city.taluka_name === "Jotana"
          );

          if (jotanaData) {
            console.log("Jotana data:", jotanaData);
            setJotanaData(jotanaData);
          } else {
            console.log("Jotana data not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchJotanaData();
    fetchPopsDataJotana();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto">
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <svg
            style={{ maxWidth: "400px" }}
            width=""
            height=""
            viewBox="0 0 200 178"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M99.874 168.795C97.972 167.104 94.5041 164.946 92.8285 162.432C90.3517 158.717 96.3713 157.537 98.9346 157.437M99.874 168.795C100.878 170.05 105.307 170.297 105.809 168.539C107.004 164.358 103.742 162.188 106.621 158.589C108.507 156.232 115.075 159.12 115.075 161.664C115.075 164.272 115.29 164.801 117 167C118.222 168.527 118.739 170.331 119.858 171.869C120.73 173.069 121.259 175.883 123.146 175.883C125.608 175.883 127.889 175.967 130.276 175.285C131.734 174.869 143.052 170.886 141.037 168.368C138.792 165.562 137.218 164.505 137.365 160.682C137.455 158.339 140.862 159.099 142.361 158.547C145.445 157.41 145.313 156.079 146.417 153.594C147.272 151.67 149.191 151.765 150.431 153.935C152.021 156.718 157.303 157.838 160.038 159.358C164.637 161.913 171.224 162.481 172.763 157.095C173.535 154.392 177.483 152.721 178.058 150.135C178.479 148.24 177.332 147.001 177.332 145.139C177.332 139.195 181.688 138.99 186.555 138.99C189.127 138.99 200.114 135.955 197.486 132.67C196.47 131.4 197.785 128.613 196.931 127.077C195.909 125.237 193.322 125.608 192.106 123.618C189.941 120.075 182.493 116.341 183.523 111.705C183.976 109.668 188.565 103.056 186.555 102.481C184.748 101.965 186.783 98.8677 185.018 98.0834C180.972 96.2851 177.981 97.3457 173.873 98.5958C171.813 99.2228 165.034 99.1371 165.034 95.9484C165.034 94.5873 165.803 92.6909 165.803 90.9525C165.803 87.9792 165.601 85.4209 165.077 82.5406C164.53 79.5345 161.912 81.6872 161.021 79.2099C159.244 74.2745 156.644 68.7701 151.626 71C145.127 73.8887 148.319 64.8224 147.186 62.1299C145.853 58.9652 145.464 61.0689 143.129 60.55C140.68 60.0058 141.208 54.8023 141.208 52.9067C141.208 50.316 141.709 49.4315 143.513 47.5265C144.298 46.6987 141.208 45.5 148 45.5C159 45.5 159.825 48.5 159.654 35.6131C159.654 33.5306 160.901 32.769 159.825 30.6172C158.778 28.5225 158.063 26.0625 156.964 24.0841C154.999 20.5477 155.353 15.738 151.626 13.3664C147.736 10.8906 139.913 14.4244 136.169 15.6722C133.259 16.6423 127.107 17.7403 125.665 20.6254C124.479 22.9973 122.584 25.5922 121.5 28C120.191 30.9093 119.574 35.0882 116.442 36.1683C111.682 37.8095 106.595 41.2076 101.667 42.1036C97.8376 42.7999 96.2235 36.8908 92.188 38.1325C88.917 39.1389 85.1908 39.5881 82.068 40.9934C78.8992 42.4194 77.575 43.5609 74.6809 41.7193C72.6104 40.4017 69.8852 39.0498 69.1299 36.5953C68.0468 33.0751 63.5742 23.6861 65.4577 20.6254C69.0029 14.8645 67.8858 14.48 65.2869 11.2314C63.5109 9.01133 64.734 7.01082 61.2731 6.02198C59.921 5.63568 59.2879 5.41482 58.9246 4.14318C58.6487 3.1774 54.623 2.52674 53.7579 2.34978C49.9486 1.5706 51.3381 6.02198 48.0361 6.02198C45.1978 6.02198 41.9306 4.37071 39.0263 5.33878C37.0072 6.01184 37.4464 9.9609 37.4464 11.573C37.4464 15.3472 37.1917 15.5307 40.1366 17.1667C42.6486 18.5623 46.6127 17.8074 44.9617 22.7604C44.3085 24.7199 41.3223 26.9542 43.9796 29.08C45.2082 30.063 45.2998 34.5244 44.3639 35.5704C41.8733 38.354 42.3826 41.1469 42.0154 44.4521C41.6179 48.0287 35.9092 48.4098 35.9092 51.7538C35.9092 53.5391 40.7438 57.7223 39.5815 58.8847C38.6189 59.8473 34.7931 58.2064 33.5607 58.3296C29.2207 58.7636 29.4799 61.0203 26.686 63.6671C24.9522 65.3097 18.8349 63.8335 18.2741 66.3572C17.8762 68.1476 18.8153 70.4237 18.0606 72.1217C16.612 75.381 16.178 76.2823 13.2782 78.6548C11.3724 80.2142 8.3842 83.3533 8.23958 85.9566C8.03004 89.7283 4.53924 88.4613 2.26157 90.739C2.06307 90.9375 5.79847 93.7382 6.31808 94.0269C8.90026 95.4614 17.0782 92.4887 18.1887 96.3754C19.5378 101.097 16.6594 107.15 17.8898 111.662C18.813 115.047 22.6072 119.685 25.7466 120.8C26.3425 121.012 32.3667 122.013 31.8954 121.483C31.3462 120.865 30.2952 120.828 29.7604 120.159C25.1093 114.345 38.4281 115.932 42.0581 115.932C44.5561 115.932 47.9229 116.385 50.043 114.736C51.408 113.675 49.0495 109.653 48.9755 108.246C48.6525 102.109 51.7382 100.56 57.2593 100.56C59.5064 100.56 64.1306 99.6702 65.4577 101.756C67.0209 104.212 67.4632 106.107 69.7277 108.246C71.4678 109.889 73.3703 109.809 72.2043 107.477C70.6111 104.291 70.6039 105.064 73.1864 102.481C75.036 100.632 76.3343 99.1391 78.1823 97.4856C80.2189 95.6634 80.4881 93.5479 80.4881 90.9525C80.4881 89.3159 79.9898 86.6936 80.6589 85.188C81.9166 82.3581 86.197 82.0892 88.5158 80.192C90.686 78.4164 91.5891 77.5307 94.4938 76.5625C97.4108 75.5902 95.4891 77.9589 95.9029 80.2347C96.3948 82.9405 100.18 87.1213 101.667 89.458C103.708 92.6641 105.476 91.3703 106.791 89.031C108.004 86.8748 116.505 94.2137 116.612 96.8878C116.825 102.212 112.466 110.67 119.858 113.797C121.765 114.604 122.743 116.449 124.811 116.871C127.042 117.328 129.204 117.469 131.472 117.469C134.456 117.469 125.81 119.8 123.701 121.91C120.731 124.88 120.48 128.263 119.303 132.03C118.453 134.75 120.142 139.186 118.15 141.296C114.65 145.001 108.501 144.793 106.023 149.751C105.093 151.611 103.546 151.684 103.546 153.978C103.546 156.701 101.517 157.335 98.9346 157.437M99.874 168.795C98.9784 167.675 98.3743 167.907 96.8743 166.407C93 164.5 88 157.865 98.9346 157.437"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">Jotana</div>
        </CardBody>
      </Card>
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <p>
            {jotanaTotal ? `Total population: ${jotanaTotal}` : <Spinner />}
          </p>
          <p>
            {jotanaData ? (
              ` No of Schools: ${jotanaData.no_of_schools}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Colleges: ${jotanaData.no_of_colleges}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Universities: ${jotanaData.no_of_universities}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Bus Stations: ${jotanaData.no_of_bus_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Railway Stations: ${jotanaData.no_of_railway_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Post Offices: ${jotanaData.no_of_post_offices}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Police Stations: ${jotanaData.no_of_police_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Fire Stations: ${jotanaData.no_of_fire_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {jotanaData ? (
              ` No of Hospitals: ${jotanaData.no_of_hospitals}`
            ) : (
              <Spinner />
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default JotanaMap;
