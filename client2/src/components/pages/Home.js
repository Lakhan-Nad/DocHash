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
      <Box>
        <Button onClick={() => setOpen(!open)}>Add new File</Button>
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
