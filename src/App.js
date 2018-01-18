import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import TableData from "./components/Table/TableData";
import Converter from "./components/Converter/Converter";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="main">
            <Switch>
              <Route exact path="/" component={TableData} />
              <Route path="/converter" component={Converter} />
            </Switch>
          </div>
          <div className="side-links">
            <NavLink to="/">Table</NavLink>
            <NavLink to="/converter">Converter</NavLink>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
