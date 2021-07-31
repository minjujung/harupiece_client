import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeCreate from "./pages/ChallengeCreate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Mypage from "./pages/Mypage";
import SearchChallenge from "./pages/SearchChallenge";

import { userCreators } from "./redux/modules/user";
import { useDispatch } from "react-redux";
import { getCookie } from "./shared/Cookie";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getCookie("token")) {
      dispatch(userCreators.loginCheckDB());
    }
  }, []);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/challenge/:id" component={ChallengeDetail} />
        <Route exact path="/challenge" component={ChallengeCreate} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/search/{page}/{searchWords}" component={SearchChallenge} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
