import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import UserList from "./Components/UserList";
import UserDetailView from "./Components/UserDetailView";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={UserList} exact />
            <Route path="/favourites" component={UserList} exact />
            <Route path="/users/:id" component={UserDetailView} exact />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
