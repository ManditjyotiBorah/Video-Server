import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import HomePage from './screens/homepage.screen';
import PlayerPage from './screens/playerpage.screen';
import LoginPage from './screens/loginpage.screen';
import ManagePage from './screens/managepage.screen'

export default function App() {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <a class="navbar-brand mb-0 h1" href="/">
            MyTube
          </a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/login">
                  Admin <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/watch/:id" exact component={PlayerPage}></Route>
          <Route path="/login" exact component={LoginPage}></Route>
          <Route path="/manage" exact component={ManagePage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

