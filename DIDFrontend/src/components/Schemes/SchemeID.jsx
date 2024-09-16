// // src/components/SchemeDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Typography, Grid, Paper } from '@mui/material';
// import { PieChart } from '@mui/x-charts/PieChart';

// const SchemeDetails = () => {
//   const { id } = useParams(); // Retrieve the scheme ID from the URL
//   const [scheme, setScheme] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getschemesbyid/${id}/`,
//             { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//         );
//         setScheme(response.data.schemes);
//       } catch (error) {
//         console.error("Error fetching scheme details:", error);
//       }
//     };

//     fetchScheme();
//   }, [id]);

//   if (!scheme) return <div>Loading...</div>;

//   // Pie chart data
//   const pieData = [
//     { name: 'Money Granted', value: scheme.moneygranted },
//     { name: 'Money Spent', value: scheme.moneyspent },
//   ];

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Scheme Details
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6"><strong>Name:</strong> {scheme.schemename}</Typography>
//             <Typography variant="h6"><strong>Ministry:</strong> {scheme.ministry}</Typography>
//             <Typography variant="h6"><strong>Description:</strong> {scheme.desc}</Typography>
//             <Typography variant="h6"><strong>Place:</strong> {scheme.place}</Typography>
//             <Typography variant="h6"><strong>Status:</strong> {scheme.status}</Typography>
//             <Typography variant="h6"><strong>Progress:</strong> {scheme.progress}%</Typography>
//             <Typography variant="h6"><strong>Lead Person:</strong> {scheme.leadperson}</Typography>
//             <Typography variant="h6"><strong>Last Edited By:</strong> {scheme.lasteditedby}</Typography>
//             <Typography variant="h6"><strong>Time Added:</strong> {scheme.timeOfschemeAdded}</Typography>
//             <Typography variant="h6"><strong>Date:</strong> {scheme.date}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <PieChart
//               series={[
//                 {
//                   data: pieData,
//                   innerRadius: 30,
//                   outerRadius: 100,
//                   paddingAngle: 5,
//                   cornerRadius: 5,
//                   startAngle: -45,
//                   endAngle: 225,
//                   cx: 150,
//                   cy: 150,
//                 }
//               ]}
//               sx={{ width: 400, height: 400 }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default SchemeDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
// import { PieChart } from '@mui/x-charts/PieChart';

// const SchemeDetails = () => {
//   const { id } = useParams(); // Retrieve the scheme ID from the URL
//   const [scheme, setScheme] = useState(null);
//   const [changeLogs, setChangeLogs] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getschemesbyid/${id}/`,
//             { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
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

//   // Pie chart data
//   const pieData = [
//     { name: 'Money Granted', value: scheme.moneygranted },
//     { name: 'Money Spent', value: scheme.moneyspent },
//   ];

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Scheme Details
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6"><strong>Name:</strong> {scheme.schemename}</Typography>
//             <Typography variant="h6"><strong>Ministry:</strong> {scheme.ministry}</Typography>
//             <Typography variant="h6"><strong>Description:</strong> {scheme.desc}</Typography>
//             <Typography variant="h6"><strong>Place:</strong> {scheme.place}</Typography>
//             <Typography variant="h6"><strong>Status:</strong> {scheme.status}</Typography>
//             <Typography variant="h6"><strong>Progress:</strong> {scheme.progress}%</Typography>
//             <Typography variant="h6"><strong>Lead Person:</strong> {scheme.leadperson}</Typography>
//             <Typography variant="h6"><strong>Last Edited By:</strong> {scheme.lasteditedby}</Typography>
//             <Typography variant="h6"><strong>Time Added:</strong> {scheme.timeOfschemeAdded}</Typography>
//             <Typography variant="h6"><strong>Date:</strong> {scheme.date}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <PieChart
//               series={[
//                 {
//                   data: pieData,
//                   innerRadius: 30,
//                   outerRadius: 100,
//                   paddingAngle: 5,
//                   cornerRadius: 5,
//                   startAngle: -45,
//                   endAngle: 225,
//                   cx: 150,
//                   cy: 150,
//                 }
//               ]}
//               sx={{ width: 400, height: 400 }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Typography variant="h6" gutterBottom>Change Logs</Typography>
//         <List>
//           {changeLogs.map(log => (
//             <ListItem key={log.id}>
//               <ListItemText
//                 primary={`Changed by ${log.changed_by} on ${new Date(log.change_time).toLocaleString()}`}
//                 secondary={log.changes}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2 }}>
//         <Typography variant="h6" gutterBottom>Team Members</Typography>
//         <List>
//           {teamMembers.map(member => (
//             <ListItem key={member.id}>
//               <ListItemText primary={member.user_email} />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//     </Container>
//   );
// };

// export default SchemeDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { BarChart } from '@mui/x-charts/BarChart';

// // Function to extract money spent changes from the log
// const extractMoneySpentChanges = (logs) => {
//   const changes = [];

//   logs.forEach(log => {
//     const regex = /moneyspent changed from ([\d.]+) to ([\d.]+)/g;
//     let match;

//     while ((match = regex.exec(log.changes)) !== null) {
//       changes.push({
//         from: parseFloat(match[1]),
//         to: parseFloat(match[2]),
//         changeAmount: parseFloat(match[2]) - parseFloat(match[1]),
//         changeDescription: `Change from ${match[1]} to ${match[2]}`
//       });
//     }
//   });

//   // Remove duplicate changes by grouping them by 'to' value
//   const uniqueChanges = [];
//   const seen = new Set();

//   changes.forEach(change => {
//     if (!seen.has(change.changeDescription)) {
//       uniqueChanges.push(change);
//       seen.add(change.changeDescription);
//     }
//   });

//   return uniqueChanges;
// };

// // Function to format data for the bar chart
// const formatBarChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     month: `Change ${index + 1}`,
//     amount: change.changeAmount
//   }));
// };

// // Function to format data for the pie chart
// const formatPieChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     name: `Change ${index + 1}`,
//     value: change.changeAmount
//   }));
// };

// const SchemeDetails = () => {
//   const { id } = useParams(); // Retrieve the scheme ID from the URL
//   const [scheme, setScheme] = useState(null);
//   const [changeLogs, setChangeLogs] = useState([]);
//   const [teamMembers, setTeamMembers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchScheme = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getschemesbyid/${id}/`, {
//             headers: { Authorization: `Bearer ${token}` },
//             withCredentials: true
//         });
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

//   // Pie chart data
//   const pieData = [
//     { name: 'Money Spent', value: scheme.moneyspent },
//     { name: 'Money Remaining', value: scheme.moneygranted - scheme.moneyspent },
//   ];

//   // Extract and format money spent changes
//   const moneySpentChanges = extractMoneySpentChanges(changeLogs);
//   const barChartData = formatBarChartData(moneySpentChanges);
//   const pieChartData = formatPieChartData(moneySpentChanges);

//   const chartSetting = {
//     xAxis: [
//       {
//         label: 'Amount Changed (in $)',
//       },
//     ],
//     yAxis: [{ scaleType: 'band', dataKey: 'month' }],
//     width: '100%',
//     height: 400,
//   };

//   const valueFormatter = (value) => `${value} $`;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Scheme Details
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6"><strong>Name:</strong> {scheme.schemename}</Typography>
//             <Typography variant="h6"><strong>Ministry:</strong> {scheme.ministry}</Typography>
//             <Typography variant="h6"><strong>Description:</strong> {scheme.desc}</Typography>
//             <Typography variant="h6"><strong>Place:</strong> {scheme.place}</Typography>
//             <Typography variant="h6"><strong>Status:</strong> {scheme.status}</Typography>
//             <Typography variant="h6"><strong>Progress:</strong> {scheme.progress}%</Typography>
//             <Typography variant="h6"><strong>Lead Person:</strong> {scheme.leadperson}</Typography>
//             <Typography variant="h6"><strong>Last Edited By:</strong> {scheme.lasteditedby}</Typography>
//             <Typography variant="h6"><strong>Time Added:</strong> {scheme.timeOfschemeAdded}</Typography>
//             <Typography variant="h6"><strong>Date:</strong> {scheme.date}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Paper elevation={3} sx={{ height: 400 }}>
//               <PieChart
//                 series={[
//                   {
//                     data: pieData,
//                     innerRadius: 50, // Adjust inner radius to show full circle with a hole in the middle
//                     outerRadius: 100,
//                     paddingAngle: 5,
//                     cornerRadius: 5,
//                     startAngle: -90,
//                     endAngle: 270,
//                     cx: 150,
//                     cy: 150,
//                   }
//                 ]}
//                 sx={{ width: '100%', height: '100%' }}
//               />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Typography variant="h6" gutterBottom>Change Logs</Typography>
//         <List>
//           {changeLogs.map(log => (
//             <ListItem key={log.id}>
//               <ListItemText
//                 primary={`Changed by ${log.changed_by} on ${new Date(log.change_time).toLocaleString()}`}
//                 secondary={log.changes}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
//         <Typography variant="h6" gutterBottom>Money Spent Changes</Typography>
//         <BarChart
//           dataset={barChartData}
//           xAxis={[{ label: 'Amount Changed (in $)' }]}
//           yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
//           series={[{ dataKey: 'amount', label: 'Amount Changed', valueFormatter }]}
//           layout="horizontal"
//           {...chartSetting}
//         />
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
//         <Typography variant="h6" gutterBottom>Money Spent Breakdown</Typography>
//         <Paper elevation={3} sx={{ height: 400 }}>
//           <PieChart
//             series={[
//               {
//                 data: pieChartData,
//                 innerRadius: 50, // Create a donut chart effect
//                 outerRadius: 100,
//                 paddingAngle: 5,
//                 cornerRadius: 5,
//                 startAngle: -90,
//                 endAngle: 270,
//                 cx: 150,
//                 cy: 150,
//               }
//             ]}
//             sx={{ width: '100%', height: '100%' }}
//           />
//         </Paper>
//       </Paper>
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
//   Grid,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { BarChart } from "@mui/x-charts/BarChart";

// // Function to extract money spent changes from the log
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

//   // Remove duplicate changes by grouping them by 'to' value
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

// // Function to format data for the bar chart
// const formatChartData = (moneySpentChanges) => {
//   return moneySpentChanges.map((change, index) => ({
//     month: `Change ${index + 1}`,
//     amount: change.changeAmount,
//   }));
// };

// const SchemeDetails = () => {
//   const { id } = useParams(); // Retrieve the scheme ID from the URL
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

//   // Pie chart data
//   const pieData = [
//     { name: "Money Spent", value: scheme.moneyspent },
//     { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
//   ];

//   // Extract and format money spent changes
//   const moneySpentChanges = extractMoneySpentChanges(changeLogs);
//   const chartData = formatChartData(moneySpentChanges);

//   const chartSetting = {
//     xAxis: [
//       {
//         label: "Amount Changed (in $)",
//       },
//     ],
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
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Scheme Details
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">
//               <strong>Name:</strong> {scheme.schemename}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Ministry:</strong> {scheme.ministry}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Description:</strong> {scheme.desc}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Place:</strong> {scheme.place}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Status:</strong> {scheme.status}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Progress:</strong> {scheme.progress}%
//             </Typography>
//             <Typography variant="h6">
//               <strong>Lead Person:</strong> {scheme.leadperson}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Last Edited By:</strong> {scheme.lasteditedby}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Time Added:</strong> {scheme.timeOfschemeAdded}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Date:</strong> {scheme.date}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <PieChart
//               series={[{
//                 data: pieData,
//                 innerRadius: 50, // Adjust inner radius to show full circle with a hole in the middle
//                 outerRadius: 100,
//                 paddingAngle: 5,
//                 cornerRadius: 5,
//                 startAngle: -90,
//                 endAngle: 270,
//                 cx: 150,
//                 cy: 150,
//               }]}
//               sx={{ width: 400, height: 400 }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Change Logs
//         </Typography>
//         <List>
//           {changeLogs.map((log) => (
//             <ListItem key={log.id}>
//               <ListItemText
//                 primary={`Changed by ${log.changed_by} on ${new Date(log.change_time).toLocaleString()}`}
//                 secondary={log.changes}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Money Spent Changes
//         </Typography>
//         <BarChart
//           dataset={chartData}
//           xAxis={[{ label: "Amount Changed (in $)" }]}
//           yAxis={[{ scaleType: "band", dataKey: "month" }]}
//           series={[{ dataKey: "amount", label: "Amount Changed", valueFormatter }]}
//           layout="horizontal"
//           {...chartSetting}
//         />
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Money Spent Breakdown
//         </Typography>
//         <Paper elevation={3} sx={{ height: 400 }}>
//           <PieChart
//             series={[{
//               data: pieChartData,
//               innerRadius: 50, // Create a donut chart effect
//               outerRadius: 100,
//               paddingAngle: 5,
//               cornerRadius: 5,
//               startAngle: -90,
//               endAngle: 270,
//               cx: 150,
//               cy: 150,
//             }]}
//             sx={{ width: "100%", height: "100%" }}
//           />
//         </Paper>
//       </Paper>
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
//   Grid,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Divider,
// } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { BarChart } from "@mui/x-charts/BarChart";

// // Function to extract money spent changes from the log
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

//   // Remove duplicate changes by grouping them by 'to' value
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

// // Function to format data for the bar chart
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
//         setTeamMembers(response.data.team_members); // Set team members data
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
//     <Container>
//       <Typography variant="h4" gutterBottom sx={{ color: 'rgb(30, 58, 138)' }}>
//         Scheme Details
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">
//               <strong>Name:</strong> {scheme.schemename}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Ministry:</strong> {scheme.ministry}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Description:</strong> {scheme.desc}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Place:</strong> {scheme.place}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Status:</strong> <Chip label={scheme.status} color="primary" />
//             </Typography>
//             <Typography variant="h6">
//               <strong>Progress:</strong> {scheme.progress}%
//             </Typography>
//             <Typography variant="h6">
//               <strong>Time Added:</strong> {scheme.timeOfschemeAdded}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Date:</strong> {scheme.date}
//             </Typography>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="h6">
//               <strong>Lead Person:</strong> {scheme.leadperson}
//             </Typography>
//             <Typography variant="h6">
//               <strong>Team Members:</strong>
//             </Typography>
//             <List>
//               {teamMembers.map((member) => (
//                 <ListItem key={member.id}>
//                   <ListItemText
//                     primary={member.user_email} // Display the email address
//                     secondary={`Added at: ${new Date(member.added_at).toLocaleString()}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <PieChart
//               series={[{
//                 data: pieData,
//                 innerRadius: 50,
//                 outerRadius: 100,
//                 paddingAngle: 5,
//                 cornerRadius: 5,
//                 startAngle: -90,
//                 endAngle: 270,
//                 cx: 150,
//                 cy: 150,
//               }]}
//               sx={{ width: 400, height: 400 }}
//             />
//           </Grid>
//         </Grid>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
//         <Typography variant="h6" gutterBottom sx={{ color: 'rgb(30, 58, 138)' }}>
//           Change Logs
//         </Typography>
//         <List>
//           {changeLogs.map((log) => (
//             <ListItem key={log.id}>
//               <ListItemText
//                 primary={`Changed by ${log.changed_by} on ${new Date(log.change_time).toLocaleString()}`}
//                 secondary={log.changes}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
//         <Typography variant="h6" gutterBottom sx={{ color: 'rgb(30, 58, 138)' }}>
//           Money Spent Changes
//         </Typography>
//         <BarChart
//           dataset={chartData}
//           xAxis={[{ label: "Amount Changed (in $)" }]}
//           yAxis={[{ scaleType: "band", dataKey: "month" }]}
//           series={[{ dataKey: "amount", label: "Amount Changed", valueFormatter }]}
//           layout="horizontal"
//           {...chartSetting}
//         />
//       </Paper>
//       <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
//         <Typography variant="h6" gutterBottom sx={{ color: 'rgb(30, 58, 138)' }}>
//           Money Spent Breakdown
//         </Typography>
//         <Paper elevation={3} sx={{ height: 400 }}>
//           <PieChart
//             series={[{
//               data: pieChartData,
//               innerRadius: 50,
//               outerRadius: 100,
//               paddingAngle: 5,
//               cornerRadius: 5,
//               startAngle: -90,
//               endAngle: 270,
//               cx: 150,
//               cy: 150,
//             }]}
//             sx={{ width: "100%", height: "100%" }}
//           />
//         </Paper>
//       </Paper>
//     </Container>
//   );
// };

// export default SchemeDetails;
























import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

// Function to extract money spent changes from the log
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
      });
    }
  });

  // Remove duplicate changes by grouping them by 'to' value
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

// Function to format data for the bar chart
const formatChartData = (moneySpentChanges) => {
  return moneySpentChanges.map((change, index) => ({
    month: `Change ${index + 1}`,
    amount: change.changeAmount,
  }));
};

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [changeLogs, setChangeLogs] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchScheme = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getschemesbyid/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setScheme(response.data.schemes);
        setChangeLogs(response.data.change_logs);
        setTeamMembers(response.data.team_members); // Set team members data
      } catch (error) {
        console.error("Error fetching scheme details:", error);
      }
    };

    fetchScheme();
  }, [id]);

  if (!scheme) return <div>Loading...</div>;

  const pieData = [
    { name: "Money Spent", value: scheme.moneyspent },
    { name: "Money Remaining", value: scheme.moneygranted - scheme.moneyspent },
  ];

  const moneySpentChanges = extractMoneySpentChanges(changeLogs);
  const chartData = formatChartData(moneySpentChanges);

  const chartSetting = {
    xAxis: [{ label: "Amount Changed (in $)" }],
    yAxis: [{ scaleType: "band", dataKey: "month" }],
    width: 500,
    height: 400,
  };

  const valueFormatter = (value) => `${value} $`;

  const formatPieChartData = (moneySpentChanges) => {
    return moneySpentChanges.map((change, index) => ({
      name: `Change ${index + 1}`,
      value: change.changeAmount,
    }));
  };

  const pieChartData = formatPieChartData(moneySpentChanges);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ color: 'rgb(30, 58, 138)', mb: 2 }}>
        Scheme Details
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Name:</strong> {scheme.schemename}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Ministry:</strong> {scheme.ministry}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Description:</strong> {scheme.desc}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Place:</strong> {scheme.place}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Status:</strong> <Chip label={scheme.status} color="primary" />
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Progress:</strong> {scheme.progress}%
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Time Added:</strong> {scheme.timeOfschemeAdded}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Date:</strong> {scheme.date}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Lead Person:</strong> {scheme.leadperson}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <strong>Team Members:</strong>
            </Typography>
            <List>
              {teamMembers.map((member) => (
                <ListItem key={member.id}>
                  <ListItemText
                    primary={member.user_email} // Display the email address
                    secondary={`Added at: ${new Date(member.added_at).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <PieChart
                series={[{
                  data: pieData,
                  innerRadius: 50,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 270,
                  cx: 150,
                  cy: 150,
                }]}
                sx={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'rgb(30, 58, 138)', mb: 2 }}>
          Change Logs
        </Typography>
        <List>
          {changeLogs.map((log) => (
            <ListItem key={log.id}>
              <ListItemText
                primary={`Changed by ${log.changed_by} on ${new Date(log.change_time).toLocaleString()}`}
                secondary={log.changes}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'rgb(30, 58, 138)', mb: 2 }}>
          Money Spent Changes
        </Typography>
        <Box sx={{ height: 400 }}>
          <BarChart
            dataset={chartData}
            xAxis={[{ label: "Amount Changed (in $)" }]}
            yAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: "amount", label: "Amount Changed", valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
            sx={{ height: '100%' }}
          />
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'rgb(30, 58, 138)', mb: 2 }}>
          Money Spent Breakdown
        </Typography>
        <Box sx={{ height: 400 }}>
          <PieChart
            series={[{
              data: pieChartData,
              innerRadius: 50,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 270,
              cx: 150,
              cy: 150,
            }]}
            sx={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default SchemeDetails;
