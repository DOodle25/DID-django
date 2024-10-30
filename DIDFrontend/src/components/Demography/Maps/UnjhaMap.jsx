import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const UnjhaMap = () => {
  const [unjhaTotal, setUnjhaTotal] = useState(null);
  const [unjhaData, setUnjhaData] = useState(null);

  useEffect(() => {
    const fetchPopsDataUnjha = async () => {
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
          const unjhaData = response.data.find(
            (entry) => entry.taluka_name === "Unjha"
          );
          if (unjhaData) {
            const unjhaTotal = unjhaData.total_population;
            console.log("Total for Unjha:", unjhaTotal);
            setUnjhaTotal(unjhaTotal);
          } else {
            console.log("Data for Unjha not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    const fetchUnjhaData = async () => {
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
          const unjhaData = response.data.data.find(
            (city) => city.taluka_name === "Unjha"
          );

          if (unjhaData) {
            console.log("Unjha data:", unjhaData);
            setUnjhaData(unjhaData);
          } else {
            console.log("Unjha data not found");
          }
        } else {
          console.log("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchUnjhaData();
    fetchPopsDataUnjha();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto">
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <svg
            style={{ maxWidth: "400px" }}
            width=""
            height=""
            viewBox="0 0 214 202"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.19419 179.335C2.19419 180.938 1.89634 185.575 2.19419 180.809C2.19419 182.902 0.974862 190.615 4.64699 187.677C6.62392 186.095 11.3894 186.117 13.845 185.224C22.1598 182.2 26.4769 186.111 26.4769 194.054C26.4769 199.61 32.4413 203.261 35.307 196.814C36.5991 193.906 35.3854 181.913 38.0664 181.913C41.4041 181.913 55.6022 171.756 48.5521 170.875C45.9821 170.554 48.0649 165.102 48.5521 163.762C49.7323 160.516 52.4194 161.094 55.1746 160.941C58.0745 160.78 61.9751 159.728 64.8632 158.979C67.3787 158.327 70.9624 160.341 73.3867 160.88C79.0176 162.131 84.0035 163.149 89.9431 163.149C96.6128 163.149 98.3626 157.251 102.636 153.215C105.806 150.221 112.977 150.064 115.636 154.319C117.028 156.545 123.752 162.323 126.428 163.088C131.724 164.6 130.56 152.372 129.678 149.904C127.294 143.228 124.375 124.045 135.749 123.414C138.854 123.241 140.378 125.458 143.475 125.621C147.45 125.83 149.003 123.404 151.692 120.715C153.019 119.389 159.742 112.741 161.074 117.404C162.256 121.54 161.741 128.005 162.239 132.244C163.025 138.922 170.764 133.347 173.829 133.347C179.358 133.347 183.057 130.351 188.73 130.036C194.705 129.704 193.615 123.271 190.692 120.348C184.839 114.494 195.999 117.37 198.05 117.956C201.869 119.047 204.182 116.215 204.182 111.824C204.182 105.39 193.483 94.991 199.522 88.9517C203.692 84.7812 203.325 79.9711 206.88 75.4C208.459 73.3706 211.908 66.7589 211.908 64.3624C211.908 59.6387 213.958 57.6427 209.946 53.6314C208.474 52.1592 205.659 52.7729 203.63 52.7729C201.608 52.7729 199.74 50.8219 197.56 50.5654C195.385 50.3096 194.834 48.3579 192.041 48.3579C189.588 48.3579 188.336 49.4617 185.97 49.4617C181.673 49.4617 177.629 53.6059 173.829 50.5654C166.825 44.962 173.59 30.5738 170.211 22.9714C168.879 19.9738 167.756 20.9586 164.447 20.7639C162.675 20.6597 161.068 17.9851 159.419 17.514C155.254 16.324 151.899 14.3014 147.89 12.1791C143.838 10.0336 153.818 2 146.235 2C141.37 2 140.071 5.97626 136.301 8.07068C133.824 9.44701 124.842 18.5387 127.777 11.9338C130.267 6.33319 122.863 3.62133 122.504 9.72632C122.37 12.0112 119.657 13.3285 118.334 14.3866C117.022 15.4366 115.528 17.7771 114.164 18.5564C110.613 20.586 109.56 28.4902 105.396 28.4902C102.6 28.4902 102.71 39.5728 99.325 38.1788C95.289 36.5169 94.8826 32.3195 90.7402 36.4618C89.059 38.143 85.0119 45.3673 81.6649 41.1835C79.6634 38.6816 74.1115 35.8717 71.2405 35.0515C66.2377 33.6221 73.2517 26.2827 65.1085 26.2827C58.1608 26.2827 56.9992 29.941 51.8634 32.66C47.5488 34.9442 42.7788 30.8204 39.1088 30.8204C33.5844 30.8204 34.2032 43.3167 34.2032 46.7023C34.2032 50.1038 37.5731 56.258 33.9579 59.1502C30.7968 61.6791 23.7495 59.5972 20.4062 57.7398C17.2068 55.9624 6.06983 57.2618 11.2695 62.4615C14.0943 65.2863 14.4181 70.5363 16.7883 73.4991C21.72 79.6636 31.3439 84.0278 28.7457 93.1215C27.2086 98.5015 20.5453 96.0319 17.8921 101.338C17.2484 102.626 18.7506 105.664 18.7506 107.409C18.7506 109.734 16.749 110.673 15.6846 112.376C13.3086 116.178 9.52601 118.446 11.0856 123.904C12.5226 128.934 18.1276 128.933 22.4699 128.932L22.6137 128.932C33.3838 128.932 36.8201 138.318 28.9297 144.63C25.0954 147.698 22.4975 153.001 18.26 155.423C14.9865 157.293 9.62943 158.399 7.22243 161.493C3.97931 165.663 5.48138 170.316 3.54323 174.677C2.64349 176.701 2.19419 177.125 2.19419 179.335Z"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="text-center">Unjha</div>
        </CardBody>
      </Card>
      <Card className="flex justify-center max-w-md w-full mb-2">
        <CardBody>
          <p>{unjhaTotal ? `Total population: ${unjhaTotal}` : <Spinner />}</p>
          <p>
            {unjhaData ? (
              ` No of Schools: ${unjhaData.no_of_schools}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Colleges: ${unjhaData.no_of_colleges}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Universities: ${unjhaData.no_of_universities}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Bus Stations: ${unjhaData.no_of_bus_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Railway Stations: ${unjhaData.no_of_railway_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Post Offices: ${unjhaData.no_of_post_offices}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Police Stations: ${unjhaData.no_of_police_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Fire Stations: ${unjhaData.no_of_fire_stations}`
            ) : (
              <Spinner />
            )}
          </p>
          <p>
            {unjhaData ? (
              ` No of Hospitals: ${unjhaData.no_of_hospitals}`
            ) : (
              <Spinner />
            )}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default UnjhaMap;
