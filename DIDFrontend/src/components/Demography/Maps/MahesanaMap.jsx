import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const MahesanaMap = () => {
  const [mahesanaTotal, setMahesanaTotal] = useState(null);
  const [mahesanaData, setMahesanaData] = useState(null);

  useEffect(() => {
    const fetchPopsDataMahesana = async () => {
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
          const mahesanaData = response.data.find(
            (entry) => entry.taluka_name === "Mahesana"
          );
          if (mahesanaData) {
            const mahesanaTotal = mahesanaData.total_population;
            console.log("Total for Mahesana:", mahesanaTotal);
            setMahesanaTotal(mahesanaTotal);
          } else {
            console.log("Data for Mahesana not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchMahesanaData = async () => {
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
          const mahesanaData = response.data.data.find(
            (city) => city.taluka_name === "Mahesana"
          );

          if (mahesanaData) {
            console.log("Mahesana data:", mahesanaData);
            setMahesanaData(mahesanaData);
          } else {
            console.log("Mahesana data not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchMahesanaData();
    fetchPopsDataMahesana();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto">
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <svg
            style={{ maxWidth: "400px" }}
            width=""
            height=""
            viewBox="0 0 327 317"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M76.0271 26.4466C76.0271 22.8771 72.9642 17.4134 77 17.8618C79.8692 17.8618 79.633 14.4543 83.5081 14.3053C87.5856 14.1485 89.009 15.3891 91.2344 17.8618C93.4615 20.3364 94.4121 24.3297 94.791 27.5504C95.048 29.7348 100.49 33.2659 101.352 30.2485C102.849 25.0086 102.156 18.1004 106.442 13.8147C111.5 6 119.5 3 119.5 3L121 2.50002C121 2.50002 123.374 1.89214 125.206 2.22524C129.369 2.9823 131.215 7.41733 131.215 10.994C131.215 14.6316 134.526 17.2399 134.526 20.4373C134.526 25.2764 133.6 30.5156 132.38 34.7861C131.681 37.2326 129.212 46.8959 132.319 48.2765C134.804 49.3809 139.336 44.7037 141.639 44.0455C144.502 43.2276 148.199 39.6242 151.083 38.3427C154.753 36.7114 156.058 34.8519 158.564 31.7201C164.557 24.2281 176.613 27.5504 185.299 27.5504C189.605 27.5504 192.79 28.6656 196.827 29.8192C199.719 30.6455 202.589 34.1729 205.719 34.1729C209.767 34.1729 209.582 39.0852 209.582 41.8993C209.582 45.6661 212.04 46.9156 212.955 50.1161C213.706 52.7461 219.509 53.9103 221.723 54.0406C225.573 54.2671 226.414 59.1021 228.591 61.5216C233.934 67.4582 228.391 73.9083 221.723 73.9083C216.142 73.9083 204.785 80.7443 206.332 87.7053C207.116 91.2313 210.481 93.3948 210.686 97.0872C210.802 99.1803 209.799 99.9423 207.988 100.46C206.102 100.999 208.216 104.462 208.417 105.365C209.687 111.079 206.84 112.42 212.893 115.606C216.804 117.664 218.345 118.641 220.374 122.474C223.824 128.991 220.206 136.409 220.62 143.445C220.792 146.376 223.931 148.423 223.931 151.723C223.931 155.369 225.652 158.898 230.001 158.898C235.592 158.898 233.774 160.401 236.931 163.558C238.136 164.763 245.601 165.845 243.247 167.728C241.993 168.73 236.072 177.279 236.072 178.765C236.072 181.834 242.695 177.867 242.695 180.973C242.695 184.59 251.485 186.875 254.223 187.657C257.35 188.55 258.683 194.055 261.459 194.218C270.717 194.763 274.227 187.932 272.558 180.421C271.782 176.93 271.769 172.034 271.392 168.832C270.768 163.526 262.228 167.699 261.52 163.803C259.594 153.213 271.041 158.809 273.845 161.964C276.193 164.605 276.44 168.73 279.732 167.789C282.99 166.858 288.14 164.847 289.911 168.832C290.999 171.279 288.59 176.708 288.01 179.317C287.638 180.991 287.531 184.201 288.01 185.879C288.305 186.909 290.766 186.692 291.199 188.209C292.814 193.863 293.346 204.152 300.642 204.152C303.618 204.152 307.016 204.329 310.024 204.152C312.167 204.026 319.165 203.076 320.816 204.397C322.214 205.515 324.373 204.676 324.373 206.911V212.43C324.373 216.669 325.584 220.145 324.128 224.878C322.994 228.562 322.701 244.991 317.198 244.991C312.784 244.991 309.607 246.976 305.609 247.198C302.086 247.394 295.675 243.576 295.675 248.854C295.675 250.744 295.915 253.25 294.326 254.68C293.102 255.781 290.784 253.684 290.402 254.066C288.833 255.634 287.949 261.55 287.949 263.755C287.949 267.963 291.361 267.696 292.303 270.991C292.673 272.286 285.727 276.852 284.883 278.962C282.59 284.693 284.939 295.757 277.402 297.91C274.226 298.817 272.661 302.475 270.534 304.839C268.122 307.519 264.614 309.203 262.562 311.768C260.65 314.158 247.84 306.438 242.94 310.358C240.334 312.443 221.045 318.45 220.62 311.216C220.256 305.043 223.873 305.263 220.62 298.523C217.775 292.631 213.452 294.449 208.478 291.962C204.737 290.091 201.458 292.546 198.299 289.387C195.486 286.574 192.677 285.596 189.224 283.622C183.539 280.374 173.021 281.584 168.988 288.038C164.909 294.564 153.477 288.511 148.923 286.1L148.875 286.075C143.498 283.228 146.897 280.107 147.71 276.448C148.225 274.132 146.547 265.691 143.847 264.92C134.901 262.364 133.514 273.192 127.352 262.099C123.051 254.357 122.322 246.125 118.215 238.368C117.169 236.393 115.411 237.325 114.107 238.368C112.228 239.871 112.587 238.959 110.734 238.43C107.793 237.589 109.74 232.221 107.791 229.784C106.082 227.648 101.414 226.38 101.414 223.468C101.414 220.832 101.543 214.086 105.277 214.086C109.84 214.086 113.972 214.434 118.215 212.737C121.565 211.397 120.177 204.474 120.177 201.392C120.177 198.203 122.656 194.557 120.423 191.765C119.041 190.038 116.723 187.438 115.517 185.388C112.093 179.568 97.5421 180.31 92.5835 182.935C86.5917 186.107 85.3729 191.09 81.5459 195.874C79.1789 198.832 77.8951 201.671 75.1686 204.397C72.8771 206.689 69.3008 207.593 67.197 210.223C63.8447 214.413 54.0424 200.647 49.7821 207.463C45.8342 213.78 36.8265 210.899 33.8389 205.256C30.0483 198.096 27.4617 191.832 27.4617 183.732C27.4617 178.684 22.9882 169.935 16.9759 169.935C9.79637 169.935 3.17895 180.338 3.17895 166.624C3.17895 164.139 1.56513 162.021 2.13651 159.45C2.73825 156.742 5.84119 160.342 6.42891 158.285C7.39856 154.891 6.17129 151.57 8.45247 148.719C9.31587 147.639 7.64657 143.854 10.2921 144.61C11.9292 145.078 12.7158 145.653 14.7684 145.653C16.8505 145.653 23.9448 144.568 25.2541 146.205C27.012 148.402 31.3376 145.696 32.5 143.5C35.1185 138.554 31.7744 139.398 30.8343 135.167C28.4962 124.646 39.3441 131.42 44.018 133.757C45.7808 134.638 49.1902 136.7 51.1312 136.7C52.3034 136.7 51.5822 132.699 51.8057 131.917C52.9873 127.781 58.3669 132.264 58.3669 125.785C58.3669 118.334 74.9176 130.496 77.0695 122.964C77.9244 119.972 75.5278 115.842 73.5743 113.889C70.7573 111.072 70.5083 105.857 70.5083 102.054C70.5083 98.8644 76.1414 99.7936 77.9893 97.9457C80.3027 95.6323 83.537 94.6992 85.1024 91.5684C87.5067 86.7598 86.0401 82.6581 87.126 77.7714C87.9471 74.0765 90.843 71.7535 92.3382 68.3895C93.9896 64.6738 93.6872 57.6242 93.6872 53.4887C93.6872 50.4896 92.3911 43.9529 89.8241 41.8993C88.1998 40.5998 81.6261 41.7409 79.3383 42.7577C73.8489 45.1975 73.8195 40.8583 73.8195 36.9323C73.8195 32.9469 76.0271 30.1888 76.0271 26.4466Z"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">Mahesana</div>
        </CardBody>
      </Card>
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <p>
            {mahesanaTotal ? `Total population: ${mahesanaTotal}` : <Spinner />}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Schools: ${mahesanaData.no_of_schools}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Colleges: ${mahesanaData.no_of_colleges}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Universities: ${mahesanaData.no_of_universities}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Bus Stations: ${mahesanaData.no_of_bus_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Railway Stations: ${mahesanaData.no_of_railway_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Post Offices: ${mahesanaData.no_of_post_offices}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Police Stations: ${mahesanaData.no_of_police_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Fire Stations: ${mahesanaData.no_of_fire_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {mahesanaData ? (
              ` No of Hospitals: ${mahesanaData.no_of_hospitals}`
            ) : (
              <Spinner />
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default MahesanaMap;
