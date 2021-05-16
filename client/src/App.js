import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("myFile", this.state.file, this.state.file.name);
    axios.post("/api/uploadfile", formData);
  };

  captureFile = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  render() {
    return (
      <div className="App">
        <h1>Hola!</h1>
        <p>The uploaded file is saved in ethereum blockchain and ipfs</p>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <input type="submit" />
        </form>
        {this.state.file !== null && (
          <p>
            <span>File Name: {this.state.file.name}</span>
            <br />
            <span>File Type: {this.state.file.type}</span>
            <br />
            <span>
              Last Modified: {this.state.file.lastModifiedDate.toDateString()}
            </span>
          </p>
        )}
      </div>
    );
  }
}

export default App;
