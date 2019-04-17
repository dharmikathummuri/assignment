import React, { Component } from "react";
import "./App.scss";
import Contacts from "./components/ContactComponent/Contacts";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Contacts />
      </div>
    );
  }
}

export default App;
