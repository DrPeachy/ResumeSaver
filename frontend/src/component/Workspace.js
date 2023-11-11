import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Item } from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import PDFViewer from './PDFViewer';
import ResumeEditor from './ResumeEditor';


const EleItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  alignItems: 'flex-start',
  justifyContent: 'center',
}));

function TabItem(props) {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, ...sx }}>
          <Typography>{children}</Typography>
        </Box>
      )
      }
    </div>
  );
};

TabItem.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let _id = location.state ? location.state.id ?? null : null;
  const [workspaceData, setWorkspaceData] = useState({});
  const [loading, setLoading] = useState(true);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    setLoading(true);
    // fetch workspace data from backend
    axios.get(`${baseUrl}/workspace?id=${_id ?? ''}`)
      .then(response => {
        if (response.status === 200) {
          // set workspace data
          setWorkspaceData(response.data.workspace);
          console.log(response.data);
          console.log(response.data.workspace.outputResume);
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/login', { state: { isWarning: "unauthorized" } });
        }
      });
  }, []);

  const [tabValue, setTabValue] = React.useState(0);

  // const fetchRecentWorkspace = () => {
  //   axios.get(`${baseUrl}/workspace/get-recent`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         setWorkspaceData(response.data.workspace);
  //         _id = response.data.workspace._id;
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      alignItems="space-between"

    >
      <Grid
        item
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap={1}
        lg={2.7}
      >
        <EleItem
          elevation={3}
          sx={{
            height: '14vh',
          }}
        >
          <Typography variant="h4">Insert Material</Typography>
        </EleItem>
        <EleItem
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '90vh',
          }}
        >
        </EleItem>
      </Grid>
      <Grid
        item
        lg={6}
      //backgroundColor="green"
      >
        <EleItem
          elevation={3}
          sx={{
            height: '100%',
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Editor" {...allyProps(0)} />
              <Tab label="Preview" {...allyProps(1)} />
            </Tabs>
          </Box>
          <TabItem
            value={tabValue}
            index={0}
            sx={{
              minHeight: '100vh',
              padding: 0,
              margin: 0,
            }}
          >
            {!loading ? (
              <ResumeEditor outputResumeId={workspaceData.outputResume} />
            ) : (
              <Typography>Loading...</Typography>
            )}
          </TabItem>
          <TabItem
            value={tabValue}
            index={1}
            sx={{
              height: '100vh',
              padding: 0,
              margin: 0,
            }}
          >
            <PDFViewer src="assets/resume.pdf" />
          </TabItem>
        </EleItem>
      </Grid>
      <Grid
        item
        lg={2.7}
      >
        <EleItem
          elevation={3}
          sx={{
            height: '100%',
          }}
        >

        </EleItem>
      </Grid>
    </Grid>
  );
};

export default Workspace;