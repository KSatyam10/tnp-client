// import React, { useState, useEffect } from 'react';
// import { Button, Grid, Container, Box, Typography, Card, CardContent, Avatar } from '@mui/material';
// import axios from 'axios';
// import Layout from '../layout/Layout';
// import { useSelector } from 'react-redux';
// import DashboardComponent from '../components/DashBoardComponent';
// import AdminHomePage from './AdminHomePage';

// const HomePage = () => {
//   const [user, setUser] = useState(null);
//   const role = useSelector((state) => state.user.role);
//   const userEmail = useSelector((state) => state.user.user);
//   const backendServer = process.env.REACT_APP_BACKEND_SERVER;

//   const getUser = async () => {
//     try {
//       const response = await axios.post(`${backendServer}/getUser`, {
//         email: userEmail,
//       });
//       setUser(response.data.user);
//       console.log(response.data.user);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, [backendServer]);

//   if (!user) {
//     return null; // Or some loading spinner
//   }

//   return (
//     <Layout>
//       <DashboardComponent user={user} />
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         {role === 'Admin' ? (
//           <Grid container spacing={3}>
//             {/* <Grid item xs={12}>
//               <Typography variant="h4" component="div" gutterBottom>
//                 Admin Dashboard
//               </Typography>
//               <Typography variant="body1">
//                 Welcome, {user.name}. Here you can manage the system.
//               </Typography>
//             </Grid> */}
//             <AdminHomePage/>
//           </Grid>
//         ) : (
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={4}>
//               <Card sx={{ textAlign: 'center', padding: 3 }}>
//                 <Avatar
//                   alt={user.name}
//                   src={user.avatarUrl}
//                   sx={{ width: 100, height: 100, margin: 'auto' }}
//                 />
//                 <CardContent>
//                   <Typography variant="h5" component="div" gutterBottom>
//                     {user.name}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {user.email}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Role: {user.role}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Registration Number: {user.registrationNumber}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Applied Companies: {user.AppliedIn.map((company, index) => (
//                       <span key={index}>{company.companyName}{index < user.AppliedIn.length - 1 ? ', ' : ''}</span>
//                     ))}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={8}>
//               <Grid container spacing={3}>
//                 {/* Add more user-specific components here */}
//               </Grid>
//             </Grid>
//           </Grid>
//         )}
//       </Box>
//     </Layout>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardContent, Avatar, Skeleton, Container } from '@mui/material';
import axios from 'axios';
import Layout from '../layout/Layout';
import { useSelector } from 'react-redux';
import DashboardComponent from '../components/DashBoardComponent';
import AdminHomePage from './AdminHomePage';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const role = useSelector((state) => state.user.role);
  const userEmail = useSelector((state) => state.user.user);
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(`${backendServer}/getUser`, {
          email: userEmail,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [backendServer, userEmail]);

  return (
    <Layout>
      <Container>
        {isLoading ? (
          <Box sx={{ p: 3 }}>
            <Skeleton variant="text" width="40%" height={50} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ textAlign: 'center', padding: 3 }}>
                  <Skeleton variant="circular" width={100} height={100} sx={{ margin: 'auto' }} />
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={30} sx={{ margin: 'auto' }} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ margin: 'auto' }} />
                    <Skeleton variant="text" width="50%" height={20} sx={{ margin: 'auto' }} />
                    <Skeleton variant="text" width="70%" height={20} sx={{ margin: 'auto' }} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={12} key={item}>
                      <Skeleton variant="rectangular" width="100%" height={118} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <>
            <DashboardComponent user={user} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
              {role === 'Admin' ? (
                <Grid container spacing={3}>
                  <AdminHomePage />
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', padding: 3 }}>
                      <Avatar
                        alt={user.name}
                        src={user.avatarUrl}
                        sx={{ width: 100, height: 100, margin: 'auto' }}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Role: {user.role}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Registration Number: {user.registrationNumber}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Applied Companies: {user.AppliedIn.map((company, index) => (
                            <span key={index}>{company.companyName}{index < user.AppliedIn.length - 1 ? ', ' : ''}</span>
                          ))}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                      {/* Add more user-specific components here */}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default HomePage;