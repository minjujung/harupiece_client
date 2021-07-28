import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import ChallengeDetail from "./pages/ChallengeDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";

import { userCreators } from './redux/modules/user';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCreators.loginCheckDB());
  },[])

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/challenge/:id" component={ChallengeDetail} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
