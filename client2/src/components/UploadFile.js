import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography, Button, withStyles } from "@material-ui/core";
import UploadService from "../utils/uploadService";

const useStyles = (_theme) => ({
  error: {
    color: "red",
  },
  fields: {
    margin: "2px",
    padding: "2px",
    minHeight: "20px",
  },
  button: {
    margin: "2px",
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.setPrivateKey = this.setPrivateKey.bind(this);

    this.state = {
      selectedFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      uploading: false,
      privateKey: "",
    };
  }

  selectFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  setPrivateKey(event) {
    this.setState({
      privateKey: event.target.value,
    });
  }

  upload() {
    console.log("Callled");
    this.setState({
      progress: 0,
      uploading: true,
    });

    UploadService.upload(
      { file: this.state.selectedFile, key: this.state.privateKey },
      (event) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      }
    )
      .then((response) => {
        this.setState({
          message: response.data.message,
          isError: false,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          isError: true,
        });
      });

    this.setState({
      selectedFile: undefined,
      privateKey: "",
      progress: 0,
      uploading: false,
    });
  }

  render() {
    const { selectedFile, progress, message, isError, uploading, privateKey } =
      this.state;
    const { classes } = this.props;
    return (
      <div className="mg20">
        {uploading && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}
        <div className={classes.fields} style={{ width: "100%" }}>
          <label htmlFor="privateKey">Private Key</label>
          <input
            type="password"
            name="privateKey"
            id="privateKey"
            value={privateKey}
            onChange={this.setPrivateKey}
          />
        </div>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            onChange={this.selectFile}
          />
          <Button
            variant="outlined"
            component="span"
            fullWidth
            disabled={uploading}
            className={classes.button}
          >
            Choose File
          </Button>
        </label>
        <Typography variant="body1">
          {selectedFile && selectedFile.name}
        </Typography>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFile || uploading}
          onClick={this.upload}
          className={classes.button}
        >
          Upload
        </Button>
        <Typography
          variant="subtitle2"
          className={`${isError ? classes.error : ""}`}
        >
          {message}
        </Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(UploadFiles);
