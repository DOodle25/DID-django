// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const PopulationData = () => {
//   const [agePops, setAgePops] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getAgePops = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           navigate("/login");
//           return;
//         }
//         const res = await axios.get("http://localhost:5000/agepops/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         });
//         console.log("okay");
//         console.log(res.data);

//         if (res.status !== 200) {
//           navigate("/login");
//           const error = new Error(res.error);
//           throw error;
//         }
//         const sortedData = res.data.sort(
//           (a, b) => a.total_population - b.total_population
//         );
//         setAgePops(sortedData);
//       } catch (err) {
//         navigate("/login");
//         console.log(err);
//       }
//     };

//     getAgePops();
//   }, [navigate]);

//   const labels = agePops
//     .map((agePop, index) =>
//       agePops.length > 0 && index < 7 ? agePop.taluka_name : "Loading..."
//     )
//     .slice(0, 7);

//   const data = agePops
//     .map((agePop, index) =>
//       agePops.length > 0 && index < 7 ? agePop.total_population : 0
//     )
//     .slice(0, 7);

//   return (
//     <div className="flex" style={{ fontSize: "16px" }}>
//       <ul>
//         {labels.map((label, index) => (
//           <li
//             className="bg-[rgb(59,93,187)] border-l-3 border-b-3 border-r-1 border-t-1 border-[rgb(30,58,138)] rounded-md mb-2 px-4 mr-4 text-white hover:bg-gray-100"
//             key={index}
//           >
//             {label}
//           </li>
//         ))}
//       </ul>
//       <ul>
//         {agePops.slice(0, 7).map((agePop, index) => (
//           <li
//             className="bg-[rgb(59,93,187)] border-l-3 border-b-3 border-r-1 border-t-1 border-[rgb(30,58,138)] rounded-md mb-2 px-4 mr-4 text-white"
//             key={index}
//           >
//             {agePop.total_population}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PopulationData;
