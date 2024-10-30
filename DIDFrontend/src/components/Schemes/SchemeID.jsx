// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Box,
// } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { BarChart } from "@mui/x-charts/BarChart";

// const extractMoneySpentChanges = (logs) => {
//   const changes = [];

//   logs.forEach((log) => {
//     const regex = /moneyspent changed from ([\d.]+) to ([\d.]+)/g;
//     let match;

//     while ((match = regex.exec(log.changes)) !== null) {
//       changes.push({
//         from: parseFloat(match[1]),
//         to: parseFloat(match[2]),
//         changeAmount: parseFloat(match[2]) - parseFloat(match[1]),
//         changeDescription: `Change from ${match[1]} to ${match[2]}`,
//       });
//     }
//   });

//   const uniqueChanges = [];
//   const seen = new Set();

//   changes.forEach((change) => {
//     if (!seen.has(change.to)) {
//       uniqueChanges.push(change);
//       seen.add(change.to);
//     }
//   });

//   return uniqueChanges;
// };

// const formatChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     month: `Change ${index + 1}`,
//     amount: change.changeAmount,
//   }));
// };

// const SchemeDetails = () => {
//   const { id } = useParams();
//   const [scheme, setScheme] = useState(null);
//   const [changeLogs, setChangeLogs] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/getschemesbyid/${id}/`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setScheme(response.data.schemes);
//         setChangeLogs(response.data.change_logs);
//         setTeamMembers(response.data.team_members);
//       } catch (error) {
//         console.error("Error fetching scheme details:", error);
//       }
//     };

//     fetchScheme();
//   }, [id]);

//   if (!scheme) return <div>Loading...</div>;

//   const pieData = [
//     { name: "Money Spent", value: scheme.moneyspent },
//     { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
//   ];

//   const moneySpentChanges = extractMoneySpentChanges(changeLogs);
//   const chartData = formatChartData(moneySpentChanges);

//   const chartSetting = {
//     xAxis: [{ label: "Amount Changed (in $)" }],
//     yAxis: [{ scaleType: "band", dataKey: "month" }],
//     width: 500,
//     height: 400,
//   };

//   const valueFormatter = (value) => `${value} $`;

//   const formatPieChartData = (moneySpentChanges) => {
//     return moneySpentChanges.map((change, index) => ({
//       name: `Change ${index + 1}`,
//       value: change.changeAmount,
//     }));
//   };

//   const pieChartData = formatPieChartData(moneySpentChanges);

//   return (
//     <Container maxWidth="lg">
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ color: "rgb(30, 58, 138)", mb: 2, fontWeight: "bold" }}
//       >
//         Details: Scheme {scheme.srno}
//       </Typography>

//       {/* Scheme Details Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h5"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", fontWeight: "bold" }}
//           >
//             {scheme.schemename}
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               mb: 1,
//               background: "rgb(59,93,187)",
//               width: "fit-content",
//               paddingRight: "14px",
//               paddingLeft: "14px",
//               borderRadius: "15px",
//               color: "white",
//             }}
//           >
//             {scheme.ministry} Ministry
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             {scheme.desc}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Location:</strong> {scheme.place}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <Chip label={scheme.status} color="primary" /> {Math.round(scheme.progress)}%
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Date Started:</strong> {scheme.date} | {scheme.timeOfschemeAdded}
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Lead:</strong> {scheme.leadperson}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Team Members:</strong>
//           </Typography>
//           <List>
//             {teamMembers.map((member) => (
//               <ListItem key={member.id}>
//                 <ListItemText
//                   primary={member.user_email}
//                   secondary={`Added at: ${new Date(
//                     member.added_at
//                   ).toLocaleString()}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       {/* Money Spent vs Total Money Granted Chart Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
//           >
//             Money Spent vs Total Money Granted
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <PieChart
//               series={[
//                 {
//                   data: pieData,
//                   innerRadius: 50,
//                   outerRadius: 100,
//                   paddingAngle: 5,
//                   cornerRadius: 5,
//                   startAngle: -90,
//                   endAngle: 270,
//                   cx: 150,
//                   cy: 150,
//                 },
//               ]}
//               sx={{ width: "100%", height: "100%" }}
//             />
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Change Logs Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
//           >
//             Change Logs
//           </Typography>
//           <List>
//             {changeLogs.map((log) => (
//               <ListItem key={log.id}>
//                 <ListItemText
//                   primary={`Changed by ${log.changed_by} on ${new Date(
//                     log.change_time
//                   ).toLocaleString()}`}
//                   secondary={log.changes}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       {/* Money Spent Changes Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
//           >
//             Money Spent Changes
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <BarChart
//               dataset={chartData}
//               xAxis={[{ label: "Amount Changed (in $)" }]}
//               yAxis={[{ scaleType: "band", dataKey: "month" }]}
//               series={[{ dataKey: "amount", label: "Amount Changed", valueFormatter }]}
//               layout="horizontal"
//               {...chartSetting}
//               sx={{ height: "100%" }}
//             />
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Money Spent Breakdown Card */}
//       <Card elevation={3}>
//         <CardContent>
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
//           >
//             Money Spent Breakdown
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <PieChart
//               series={[
//                 {
//                   data: pieChartData,
//                   innerRadius: 50,
//                   outerRadius: 100,
//                   paddingAngle: 5,
//                   cornerRadius: 5,
//                   startAngle: -90,
//                   endAngle: 270,
//                   cx: 150,
//                   cy: 150,
//                 },
//               ]}
//               sx={{ width: "100%", height: "100%" }}
//             />
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default SchemeDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { BarChart } from "@mui/x-charts/BarChart";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Pie, Bar, Line } from "react-chartjs-2";

// ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale);

// const extractMoneySpentChanges = (logs) => {
//   const changes = [];

//   logs.forEach((log) => {
//     const regex = /moneyspent changed from ([\d.]+) to ([\d.]+)/g;
//     let match;

//     while ((match = regex.exec(log.changes)) !== null) {
//       changes.push({
//         from: parseFloat(match[1]),
//         to: parseFloat(match[2]),
//         changeAmount: parseFloat(match[2]) - parseFloat(match[1]),
//         changeDescription: `Change from ${match[1]} to ${match[2]}`,
//       });
//     }
//   });

//   const uniqueChanges = [];
//   const seen = new Set();

//   changes.forEach((change) => {
//     if (!seen.has(change.to)) {
//       uniqueChanges.push(change);
//       seen.add(change.to);
//     }
//   });

//   return uniqueChanges;
// };

// const formatChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     month: `Change ${index + 1}`,
//     amount: change.changeAmount,
//   }));
// };

// const SchemeDetails = () => {
//   const { id } = useParams();
//   const [scheme, setScheme] = useState(null);
//   const [changeLogs, setChangeLogs] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [chartType, setChartType] = useState("bar"); // Default chart type
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/getschemesbyid/${id}/`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setScheme(response.data.schemes);
//         setChangeLogs(response.data.change_logs);
//         setTeamMembers(response.data.team_members);
//       } catch (error) {
//         console.error("Error fetching scheme details:", error);
//       }
//     };

//     fetchScheme();
//   }, [id]);

//   if (!scheme) return <div>Loading...</div>;

//   const pieData = [
//     { name: "Money Spent", value: scheme.moneyspent },
//     { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
//   ];

//   const moneySpentChanges = extractMoneySpentChanges(changeLogs);
//   const chartData = formatChartData(moneySpentChanges);

//   const chartSetting = {
//     xAxis: [{ label: "Amount Changed (in $)" }],
//     yAxis: [{ scaleType: "band", dataKey: "month" }],
//     width: 500,
//     height: 400,
//   };

//   const valueFormatter = (value) => `${value} $`;

//   const formatPieChartData = (moneySpentChanges) => {
//     return moneySpentChanges.map((change, index) => ({
//       name: `Change ${index + 1}`,
//       value: change.changeAmount,
//     }));
//   };

//   const pieChartData = formatPieChartData(moneySpentChanges);

//   // Chart.js data and options
//   const chartJSData = {
//     labels: chartData.map((data) => data.month),
//     datasets: [
//       {
//         label: "Amount Changed",
//         data: chartData.map((data) => data.amount),
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartJSOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || "";
//             if (label) {
//               label += ": ";
//             }
//             label += context.raw + " $"; // Formatting label to show dollar amount
//             return label;
//           },
//         },
//       },
//     },
//   };

//   const handleChartTypeChange = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (type) => {
//     setChartType(type);
//     setAnchorEl(null);
//   };

//   return (
//     <Container maxWidth="lg">
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ color: "rgb(30, 58, 138)", mb: 2, fontWeight: "bold" }}
//       >
//         Details: Scheme {scheme.srno}
//       </Typography>

//       {/* Scheme Details Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h5"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", fontWeight: "bold" }}
//           >
//             {scheme.schemename}
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               mb: 1,
//               background: "rgb(59,93,187)",
//               width: "fit-content",
//               paddingRight: "14px",
//               paddingLeft: "14px",
//               borderRadius: "15px",
//               color: "white",
//             }}
//           >
//             {scheme.ministry} Ministry
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             {scheme.desc}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Location:</strong> {scheme.place}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <Chip label={scheme.status} color="primary" /> {Math.round(scheme.progress)}%
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Date Started:</strong> {scheme.date} | {scheme.timeOfschemeAdded}
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Lead:</strong> {scheme.leadperson}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Team Members:</strong>
//           </Typography>
//           <List>
//             {teamMembers.map((member) => (
//               <ListItem key={member.id}>
//                 <ListItemText
//                   primary={member.user_email}
//                   secondary={`Added at: ${new Date(
//                     member.added_at
//                   ).toLocaleString()}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       {/* Chart Type Selector */}
//       <Box sx={{ mb: 2 }}>
//         <Button variant="contained" onClick={handleChartTypeChange}>
//           Select Chart Type
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={() => setAnchorEl(null)}
//         >
//           <MenuItem onClick={() => handleMenuClose("bar")}>Bar Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("line")}>Line Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("pie")}>Pie Chart</MenuItem>
//         </Menu>
//       </Box>

//       {/* Chart Rendering */}
//       <Box sx={{ mb: 5 }}>
//         {chartType === "bar" && (
//           <Bar data={chartJSData} options={chartJSOptions} />
//         )}
//         {chartType === "line" && (
//           <Line data={chartJSData} options={chartJSOptions} />
//         )}
//         {chartType === "pie" && (
//           <Pie
//             data={{
//               labels: pieChartData.map((data) => data.name),
//               datasets: [
//                 {
//                   data: pieChartData.map((data) => data.value),
//                   backgroundColor: [
//                     "rgba(255, 99, 132, 0.2)",
//                     "rgba(54, 162, 235, 0.2)",
//                     "rgba(255, 206, 86, 0.2)",
//                   ],
//                   borderColor: [
//                     "rgba(255, 99, 132, 1)",
//                     "rgba(54, 162, 235, 1)",
//                     "rgba(255, 206, 86, 1)",
//                   ],
//                   borderWidth: 1,
//                 },
//               ],
//             }}
//             options={chartJSOptions}
//           />
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default SchemeDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineController,
//   BubbleController,
//   Filler,
// } from "chart.js";
// import { Pie, Bar, Line, Radar, PolarArea, Doughnut, Bubble, Scatter } from "react-chartjs-2";

// ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, PointElement, LineController, BubbleController, Filler);

// const extractMoneySpentChanges = (logs) => {
//   const changes = [];

//   logs.forEach((log) => {
//     const regex = /moneyspent changed from ([\d.]+) to ([\d.]+)/g;
//     let match;

//     while ((match = regex.exec(log.changes)) !== null) {
//       changes.push({
//         from: parseFloat(match[1]),
//         to: parseFloat(match[2]),
//         changeAmount: parseFloat(match[2]) - parseFloat(match[1]),
//         changeDescription: `Change from ${match[1]} to ${match[2]}`,
//       });
//     }
//   });

//   const uniqueChanges = [];
//   const seen = new Set();

//   changes.forEach((change) => {
//     if (!seen.has(change.to)) {
//       uniqueChanges.push(change);
//       seen.add(change.to);
//     }
//   });

//   return uniqueChanges;
// };

// const formatChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     month: `MoneySpend-${index + 1}`, // Updated label format
//     amount: change.changeAmount,
//   }));
// };

// const SchemeDetails = () => {
//   const { id } = useParams();
//   const [scheme, setScheme] = useState(null);
//   const [changeLogs, setChangeLogs] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [chartType, setChartType] = useState("bar"); // Default chart type
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/getschemesbyid/${id}/`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setScheme(response.data.schemes);
//         setChangeLogs(response.data.change_logs);
//         setTeamMembers(response.data.team_members);
//       } catch (error) {
//         console.error("Error fetching scheme details:", error);
//       }
//     };

//     fetchScheme();
//   }, [id]);

//   if (!scheme) return <div>Loading...</div>;

//   const pieData = [
//     { name: "Money Spent", value: scheme.moneyspent },
//     { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
//   ];

//   const moneySpentChanges = extractMoneySpentChanges(changeLogs);
//   const chartData = formatChartData(moneySpentChanges);

//   // Chart.js data and options
//   const chartJSData = {
//     labels: chartData.map((data) => data.month),
//     datasets: [
//       {
//         label: "Amount Changed",
//         data: chartData.map((data) => data.amount),
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartJSOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || "";
//             if (label) {
//               label += ": ";
//             }
//             label += context.raw + " $"; // Formatting label to show dollar amount
//             return label;
//           },
//         },
//       },
//     },
//   };

//   const handleChartTypeChange = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (type) => {
//     setChartType(type);
//     setAnchorEl(null);
//   };

//   return (
//     <Container maxWidth="lg">
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ color: "rgb(30, 58, 138)", mb: 2, fontWeight: "bold" }}
//       >
//         Details: Scheme {scheme.srno}
//       </Typography>

//       {/* Scheme Details Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h5"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", fontWeight: "bold" }}
//           >
//             {scheme.schemename}
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               mb: 1,
//               background: "rgb(59,93,187)",
//               width: "fit-content",
//               paddingRight: "14px",
//               paddingLeft: "14px",
//               borderRadius: "15px",
//               color: "white",
//             }}
//           >
//             {scheme.ministry} Ministry
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             {scheme.desc}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Location:</strong> {scheme.place}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <Chip label={scheme.status} color="primary" /> {Math.round(scheme.progress)}%
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Date Started:</strong> {scheme.date} | {scheme.timeOfschemeAdded}
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Lead:</strong> {scheme.leadperson}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Team Members:</strong>
//           </Typography>
//           <List>
//             {teamMembers.map((member) => (
//               <ListItem key={member.id}>
//                 <ListItemText
//                   primary={member.user_email}
//                   secondary={`Added at: ${new Date(
//                     member.added_at
//                   ).toLocaleString()}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       {/* Chart Type Selector */}
//       <Box sx={{ mb: 2 }}>
//         <Button variant="contained" onClick={handleChartTypeChange}>
//           Select Chart Type
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={() => setAnchorEl(null)}
//         >
//           <MenuItem onClick={() => handleMenuClose("bar")}>Bar Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("line")}>Line Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("pie")}>Pie Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("radar")}>Radar Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("polarArea")}>Polar Area Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("doughnut")}>Doughnut Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("bubble")}>Bubble Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("scatter")}>Scatter Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("mixed")}>Mixed Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("horizontalBar")}>Horizontal Bar Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("stackedBar")}>Stacked Bar Chart</MenuItem>
//           <MenuItem onClick={() => handleMenuClose("verticalBar")}>Vertical Bar Chart</MenuItem>
//         </Menu>
//       </Box>

//       {/* Chart Rendering */}
//       <Box sx={{ mb: 5 }}>
//         {chartType === "bar" && (
//           <Bar data={chartJSData} options={chartJSOptions} />
//         )}
//         {chartType === "line" && (
//           <Line data={chartJSData} options={chartJSOptions} />
//         )}
//         {chartType === "pie" && (
//           <Pie data={{
//               labels: pieData.map((data) => data.name),
//               datasets: [{
//                 data: pieData.map((data) => data.value),
//                 backgroundColor: [
//                   "rgba(255, 99, 132, 0.2)",
//                   "rgba(54, 162, 235, 0.2)",
//                   "rgba(255, 206, 86, 0.2)",
//                 ],
//                 borderColor: [
//                   "rgba(255, 99, 132, 1)",
//                   "rgba(54, 162, 235, 1)",
//                   "rgba(255, 206, 86, 1)",
//                 ],
//                 borderWidth: 1,
//               }],
//             }} options={chartJSOptions} />
//         )}
//         {chartType === "radar" && <Radar data={chartJSData} options={chartJSOptions} />}
//         {chartType === "polarArea" && <PolarArea data={chartJSData} options={chartJSOptions} />}
//         {chartType === "doughnut" && <Doughnut data={chartJSData} options={chartJSOptions} />}
//         {chartType === "bubble" && (
//           <Bubble data={chartJSData} options={chartJSOptions} />
//         )}
//         {chartType === "scatter" && (
//           <Scatter data={chartJSData} options={chartJSOptions} />
//         )}
//         {/* Add mixed, horizontal bar, stacked bar, and vertical bar charts here */}
//         {chartType === "mixed" && (
//           <Bar data={chartJSData} options={{ ...chartJSOptions, scales: { x: { stacked: true }, y: { stacked: true } } }} />
//         )}
//         {chartType === "horizontalBar" && (
//           <Bar data={chartJSData} options={{ ...chartJSOptions, indexAxis: 'y' }} />
//         )}
//         {chartType === "stackedBar" && (
//           <Bar data={chartJSData} options={{ ...chartJSOptions, scales: { x: { stacked: true }, y: { stacked: true } } }} />
//         )}
//         {chartType === "verticalBar" && (
//           <Bar data={chartJSData} options={chartJSOptions} />
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default SchemeDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineController,
//   BubbleController,
//   Filler,
// } from "chart.js";
// import {
//   Pie,
//   Bar,
//   Line,
//   Radar,
//   PolarArea,
//   Doughnut,
//   Bubble,
//   Scatter,
// } from "react-chartjs-2";

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineController,
//   BubbleController,
//   Filler
// );

// const extractMoneySpentChanges = (logs) => {
//   const changes = [];

//   logs.forEach((log) => {
//     const regex = /moneyspent changed from ([\d.]+) to ([\d.]+)/g;
//     let match;

//     while ((match = regex.exec(log.changes)) !== null) {
//       changes.push({
//         from: parseFloat(match[1]),
//         to: parseFloat(match[2]),
//         changeAmount: parseFloat(match[2]) - parseFloat(match[1]),
//         changeDescription: `Change from ${match[1]} to ${match[2]}`,
//         changeTime: log.change_time, // Include change time
//       });
//     }
//   });

//   const uniqueChanges = [];
//   const seen = new Set();

//   changes.forEach((change) => {
//     if (!seen.has(change.to)) {
//       uniqueChanges.push(change);
//       seen.add(change.to);
//     }
//   });

//   return uniqueChanges;
// };

// const formatChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     month: `MoneySpend-${index + 1}`, // Updated label format
//     amount: change.changeAmount,
//     changeTime: change.changeTime, // Include change time
//   }));
// };

// const SchemeDetails = () => {
//   const { id } = useParams();
//   const [scheme, setScheme] = useState(null);
//   const [changeLogs, setChangeLogs] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [chartType, setChartType] = useState("bar"); // Default chart type
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/getschemesbyid/${id}/`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true,
//           }
//         );
//         setScheme(response.data.schemes);
//         setChangeLogs(response.data.change_logs);
//         setTeamMembers(response.data.team_members);
//       } catch (error) {
//         console.error("Error fetching scheme details:", error);
//       }
//     };

//     fetchScheme();
//   }, [id]);

//   if (!scheme) return <div>Loading...</div>;

//   const pieData = [
//     { name: "Money Spent", value: scheme.moneyspent },
//     { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
//   ];

//   const moneySpentChanges = extractMoneySpentChanges(changeLogs);
//   const chartData = formatChartData(moneySpentChanges);

//   // Chart.js data and options
//   const chartJSData = {
//     labels: chartData.map((data) => data.month),
//     datasets: [
//       {
//         label: "Amount Changed",
//         data: chartData.map((data) => data.amount),
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartJSOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || "";
//             if (label) {
//               label += ": ";
//             }
//             const changeTime = chartData[context.dataIndex].changeTime;
//             label += `${context.raw} $ (Changed on ${new Date(
//               changeTime
//             ).toLocaleString()})`; // Formatting label to show dollar amount and change time
//             return label;
//           },
//         },
//       },
//     },
//   };

//   const handleChartTypeChange = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (type) => {
//     setChartType(type);
//     setAnchorEl(null);
//   };

//   return (
//     <Container maxWidth="lg">
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ color: "rgb(30, 58, 138)", mb: 2, fontWeight: "bold" }}
//       >
//         Details: Scheme {scheme.srno}
//       </Typography>

//       {/* Scheme Details Card */}
//       <Card elevation={3} sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h5"
//             gutterBottom
//             sx={{ color: "rgb(30, 58, 138)", fontWeight: "bold" }}
//           >
//             {scheme.schemename}
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               mb: 1,
//               background: "rgb(59,93,187)",
//               width: "fit-content",
//               paddingRight: "14px",
//               paddingLeft: "14px",
//               borderRadius: "15px",
//               color: "white",
//             }}
//           >
//             {scheme.ministry} Ministry
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             {scheme.desc}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Location:</strong> {scheme.place}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <Chip label={scheme.status} color="primary" />{" "}
//             {Math.round(scheme.progress)}%
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Date Started:</strong> {scheme.date} |{" "}
//             {scheme.timeOfschemeAdded}
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Lead:</strong> {scheme.leadperson}
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             <strong>Team Members:</strong>
//           </Typography>
//           <List>
//             {teamMembers.map((member) => (
//               <ListItem key={member.id}>
//                 <ListItemText
//                   primary={member.user_email}
//                   secondary={`Added at: ${new Date(
//                     member.added_at
//                   ).toLocaleString()}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       {/* Chart Type Selector */}
//       <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
//         <Box sx={{ mb: 2 }}>
//           <Button variant="contained" onClick={handleChartTypeChange}>
//             Select Chart Type
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => setAnchorEl(null)}
//           >
//             <MenuItem onClick={() => handleMenuClose("bar")}>
//               Bar Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("line")}>
//               Line Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("pie")}>
//               Pie Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("radar")}>
//               Radar Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("polarArea")}>
//               Polar Area Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("doughnut")}>
//               Doughnut Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("bubble")}>
//               Bubble Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("scatter")}>
//               Scatter Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("mixed")}>
//               Mixed Chart
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("funnel")}>
//               Funnel Chart
//             </MenuItem>
//           </Menu>
//         </Box>
//       </div>
//       <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
//         {/* Chart Rendering */}
//         <Box className="ChartHolder" sx={{ position: "relative", height: "", width: { xs: '100%', md: '70%' }, }}>
//           {chartType === "bar" && (
//             <Bar data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "line" && (
//             <Line data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "pie" && (
//             <Pie data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "radar" && (
//             <Radar data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "polarArea" && (
//             <PolarArea data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "doughnut" && (
//             <Doughnut data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "bubble" && (
//             <Bubble data={chartJSData} options={chartJSOptions} />
//           )}
//           {chartType === "scatter" && (
//             <Scatter data={chartJSData} options={chartJSOptions} />
//           )}
//           {/* Add more chart types as needed */}
//         </Box>
//       </div>
//     </Container>
//   );
// };

// export default SchemeDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BubbleController,
  Filler,
} from "chart.js";
import {
  Pie,
  Bar,
  Line,
  Radar,
  PolarArea,
  Doughnut,
  Bubble,
  Scatter,
} from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BubbleController,
  Filler
);

const extractMoneySpentChanges = (logs) => {
  const changes = [];

  logs.forEach((log) => {
    const regex = /moneyspent changed from ([\d.]+) to ([\d.]+)/g;
    let match;

    while ((match = regex.exec(log.changes)) !== null) {
      changes.push({
        from: parseFloat(match[1]),
        to: parseFloat(match[2]),
        changeAmount: parseFloat(match[2]) - parseFloat(match[1]),
        changeDescription: `Change from ${match[1]} to ${match[2]}`,
        changeTime: log.change_time, // Include change time
      });
    }
  });

  const uniqueChanges = [];
  const seen = new Set();

  changes.forEach((change) => {
    if (!seen.has(change.to)) {
      uniqueChanges.push(change);
      seen.add(change.to);
    }
  });

  return uniqueChanges;
};

const formatChartData = (moneySpentChanges) => {
  return moneySpentChanges.map((change, index) => ({
    month: `MoneySpend-${index + 1}`, // Updated label format
    amount: change.changeAmount,
    changeTime: change.changeTime, // Include change time
  }));
};

const generateBubbleData = (moneySpentChanges) => {
  return {
    datasets: [
      {
        label: "Bubble Data",
        data: moneySpentChanges.map((change, index) => ({
          x: index + 1, // X-axis value
          y: change.changeAmount, // Y-axis value
          r: change.changeAmount / 10, // Radius size
        })),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
};

const generateScatterData = (moneySpentChanges) => {
  return {
    datasets: [
      {
        label: "Scatter Data",
        data: moneySpentChanges.map((change, index) => ({
          x: index + 1,
          y: change.changeAmount,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};

const generateMixedData = (chartData) => {
  return {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        type: "bar",
        label: "Bar Dataset",
        data: chartData.map((data) => data.amount),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        type: "line",
        label: "Line Dataset",
        data: chartData.map((data) => data.amount),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };
};

const generateFunnelData = (moneySpentChanges) => {
  return {
    labels: moneySpentChanges.map((_, index) => `Stage ${index + 1}`),
    datasets: [
      {
        label: "Funnel Data",
        data: moneySpentChanges.map((change) => change.changeAmount),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };
};

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [changeLogs, setChangeLogs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [chartType, setChartType] = useState("bar"); // Default chart type
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchScheme = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/getschemesbyid/${id}/`,
          // `https://didbackend.onrender.com/getschemesbyid/${id}/`,
          `${import.meta.env.VITE_BACKEND_URL}/getschemesbyid/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setScheme(response.data.schemes);
        setChangeLogs(response.data.change_logs);
        setTeamMembers(response.data.team_members);
      } catch (error) {
        console.error("Error fetching scheme details:", error);
      }
    };

    fetchScheme();
  }, [id]);

  if (!scheme) return <div>Loading...</div>;

  const moneySpentChanges = extractMoneySpentChanges(changeLogs);
  const chartData = formatChartData(moneySpentChanges);

  // Chart.js data and options
  const chartJSData = {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "Amount Changed",
        data: chartData.map((data) => data.amount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartJSOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const changeTime = chartData[context.dataIndex].changeTime;
            label += `${context.raw} $ (Changed on ${new Date(
              changeTime
            ).toLocaleString()})`; // Formatting label to show dollar amount and change time
            return label;
          },
        },
      },
    },
  };

  const handleChartTypeChange = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (type) => {
    setChartType(type);
    setAnchorEl(null);
  };
  const pieData = [
    { name: "Money Spent", value: scheme.moneyspent },
    { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
  ];
  const valueFormatter = (value) => `${value} $`;

  const chartSetting = {
    xAxis: [{ label: "Amount Changed (in $)" }],
    yAxis: [{ scaleType: "band", dataKey: "month" }],
    width: 500,
    height: 400,
  };

  const formatPieChartData = (moneySpentChanges) => {
    return moneySpentChanges.map((change, index) => ({
      name: `Change ${index + 1}`,
      value: change.changeAmount,
    }));
  };

  const pieChartData = formatPieChartData(moneySpentChanges);
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "rgb(30, 58, 138)", mb: 2, fontWeight: "bold" }}
      >
        Details: Scheme {scheme.srno}
      </Typography>

      {/* Scheme Details Card */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "rgb(30, 58, 138)", fontWeight: "bold" }}
          >
            {scheme.schemename}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              background: "rgb(59,93,187)",
              width: "fit-content",
              paddingRight: "14px",
              paddingLeft: "14px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            {scheme.ministry} Ministry
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {scheme.desc}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            <strong>Location:</strong> {scheme.place}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            <Chip label={scheme.status} color="primary" />{" "}
            {Math.round(scheme.progress)}%
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            <strong>Date Started:</strong> {scheme.date} |{" "}
            {scheme.timeOfschemeAdded}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            <strong>Lead:</strong> {scheme.leadperson}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            <strong>Team Members:</strong>
          </Typography>
          <List sx={{ margin: "0", padding: "0" }}>
            {teamMembers.map((member) => (
              <ListItem key={member.id}>
                <ListItemText
                  primary={
                    <Typography variant="body2">{member.user_email}</Typography>
                  }
                  secondary={
                    <Typography variant="body2">
                      {`Added at: ${new Date(
                        member.added_at
                      ).toLocaleString()}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Chart Selection Menu */}
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Button
          variant="contained"
          onClick={handleChartTypeChange}
          sx={{ mb: 2, backgroundColor: "rgb(30, 58, 138)", color: "white" }}
        >
          Change Chart Type
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleMenuClose("bar")}>Bar Chart</MenuItem>
          <MenuItem onClick={() => handleMenuClose("line")}>
            Line Chart
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("pie")}>Pie Chart</MenuItem>
          {/* <MenuItem onClick={() => handleMenuClose("bubble")}>Bubble Chart</MenuItem> */}
          <MenuItem onClick={() => handleMenuClose("scatter")}>
            Scatter Chart
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("mixed")}>
            Mixed Chart
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("funnel")}>
            Funnel Chart
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("radar")}>
            Radar Chart
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("polarArea")}>
            Polar Area Chart
          </MenuItem>
          <MenuItem onClick={() => handleMenuClose("doughnut")}>
            Doughnut Chart
          </MenuItem>
        </Menu>
      </div>
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Box
          className="ChartHolder"
          sx={{
            position: "relative",
            height: "",
            width: { xs: "100%", md: "70%" },
          }}
        >
          {/* Chart Rendering */}
          {chartType === "bar" && (
            <Bar data={chartJSData} options={chartJSOptions} />
          )}
          {chartType === "line" && (
            <Line data={chartJSData} options={chartJSOptions} />
          )}
          {chartType === "pie" && (
            <Doughnut data={chartJSData} options={chartJSOptions} />
          )}
          {/* {chartType === "bubble" && (
        <Bubble data={generateBubbleData(moneySpentChanges)} options={chartJSOptions} />
      )} */}
          {chartType === "scatter" && (
            <Scatter
              data={generateScatterData(moneySpentChanges)}
              options={chartJSOptions}
            />
          )}
          {chartType === "mixed" && (
            <Line
              data={generateMixedData(chartData)}
              options={chartJSOptions}
            />
          )}
          {chartType === "funnel" && (
            <Doughnut
              data={generateFunnelData(moneySpentChanges)}
              options={chartJSOptions}
            />
          )}
          {chartType === "radar" && (
            <Radar data={chartJSData} options={chartJSOptions} />
          )}
          {chartType === "polarArea" && (
            <PolarArea data={chartJSData} options={chartJSOptions} />
          )}
          {chartType === "doughnut" && (
            <Doughnut data={chartJSData} options={chartJSOptions} />
          )}
        </Box>
      </div>

      {/* Change Logs Card */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
          >
            Change Logs
          </Typography>
          <List>
            {changeLogs.map((log) => (
              <ListItem key={log.id}>
                <ListItemText
                  primary={`Changed by ${log.changed_by} on ${new Date(
                    log.change_time
                  ).toLocaleString()}`}
                  secondary={log.changes}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Money Spent vs Total Money Granted Chart Card */}
      <Card elevation={3} sx={{ mb: 3, display: { xs: "none", sm: "block" } }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
          >
            Money Spent vs Total Money Granted
          </Typography>
          <Box sx={{ height: { xs: 300, sm: 400 }, width: "100%" }}>
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: "40%",
                  outerRadius: "80%",
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 270,
                  cx: "50%",
                  cy: "50%",
                },
              ]}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Money Spent Changes Card */}
      <Card elevation={3} sx={{ mb: 3, display: { xs: "none", sm: "block" } }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
          >
            Money Spent Changes
          </Typography>
          <Box sx={{ height: { xs: 300, sm: 400 }, width: "100%" }}>
            <BarChart
              dataset={chartData}
              xAxis={[{ label: "Amount Changed (in $)" }]}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "amount", label: "Amount Changed", valueFormatter },
              ]}
              layout="horizontal"
              {...chartSetting}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Money Spent Breakdown Card */}
      <Card elevation={3} sx={{ display: { xs: "none", sm: "block" } }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "rgb(30, 58, 138)", mb: 2 }}
          >
            Money Spent Breakdown
          </Typography>
          <Box sx={{ height: { xs: 300, sm: 400 }, width: "100%" }}>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  innerRadius: "40%",
                  outerRadius: "80%",
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 270,
                  cx: "50%",
                  cy: "50%",
                },
              ]}
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SchemeDetails;
