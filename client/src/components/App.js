import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Login from "./RegisterLogin/index";
import Register from "./RegisterLogin/register";

function App() {
  return (
    <React.Fragment>
      <div>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
