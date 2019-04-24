import React, { Component } from "react";
import "./App.scss";
import Contacts from "./components/ContactComponent/Contacts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Contacts} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
