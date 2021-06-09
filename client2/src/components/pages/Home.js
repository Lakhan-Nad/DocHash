import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import UploadFile from "../../components/UploadFile";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Tabs from "../Tabs";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Box textAlign="center" width="100%">
        <Button onClick={() => setOpen(!open)} variant="contained">
          <AddIcon />
          Add new File
        </Button>
      </Box>
      <Box width="100%" mt={5}>
        <Tabs />
      </Box>
      <Dialog open={open}>
        <DialogTitle>Adding a New File to Blockchain</DialogTitle>
        <DialogContent>
          <UploadFile />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Home;
