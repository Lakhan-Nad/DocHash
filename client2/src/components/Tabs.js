import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Button, List, ListItem } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [files, setFiles] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);
  const [noAccessFiles, setNoAccessFiles] = useState([]);
  const [grantAccessFiles, setGrantAcessFiles] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios
      .get("/api/file/")
      .then((val) => {
        if (val.data) {
          setFiles(val.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/file/other")
      .then((val) => {
        if (val.data) {
          setOtherFiles(val.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/file/noAccess")
      .then((val) => {
        if (val.data) {
          setNoAccessFiles(val.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/file/requests")
      .then((val) => {
        if (val.data) {
          setGrantAcessFiles(val.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const downloadFile = useCallback((path) => {
    axios
      .get(path)
      .then((val) => {
        window.open(val.data, "_blank");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }, []);
  const requestAccess = useCallback((path) => {
    axios
      .get(path)
      .then((val) => {
        alert("Request Made");
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }, []);
  const grantAccess = useCallback((file) => {}, []);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered={true}
        >
          <Tab label="My Files" {...a11yProps(0)} />
          <Tab label="Other Files" {...a11yProps(1)} />
          <Tab label="No Access Files" {...a11yProps(2)} />
          <Tab label="Access Requests" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List>
          {files.map((file) => (
            <ListItem>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="inherit">
                  {file.filename}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    downloadFile(`/api/file/download/${file.filename}`)
                  }
                >
                  Download
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {otherFiles.map((file) => (
            <ListItem>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="inherit">
                  {file.filename}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    downloadFile(`/api/file/download/${file.filename}`)
                  }
                >
                  Download
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List>
          {noAccessFiles.map((file) => (
            <ListItem>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="inherit">
                  {file.filename}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    requestAccess(`/api/file/request/${file.filename}`)
                  }
                >
                  Request Access
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <List>
          {grantAccessFiles.map((file) => (
            <ListItem>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="inherit">
                  {file.filename}
                </Typography>
                <Typography variant="body1" color="inherit">
                  {file.user}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => grantAccess(file)}
                >
                  Grant Access
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </TabPanel>
    </div>
  );
}
