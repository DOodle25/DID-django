import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Temp1 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null); // Initialize state with null or an appropriate default value

  useEffect(() => {
    const callTemp = async () => {
      try {
        const res = await axios.get(
          // "https://myapp.vercel.app/temp"
          "http://localhost:5000/temp"
          , {
          withCredentials: true,
        });

        console.log(res.data);

        if (res.status !== 200) {
          navigate("/login");
          const error = new Error(res.error);
          throw error;
        }

        setData(res.data); // Update state with the received data
        console.log("Data in state:", data); // Log the data in the state
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    };

    // Call the function when the component mounts
    callTemp();
  }, [navigate]); // Add navigate as a dependency to useEffect

  return (
    <>
      <h1>Temp1</h1>
      {data && <div>Username: {data.user.firstName}</div>} {/* Render only if data is available */}
    </>
  );
};

export default Temp1;
