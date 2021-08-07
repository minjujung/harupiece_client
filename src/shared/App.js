import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import ChallengeDetail from "../pages/ChallengeDetail";
import ChallengeCreate from "../pages/ChallengeCreate";
import ChallengeEdit from "../pages/ChallengeEdit";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import SearchChallenge from "../pages/SearchChallenge";

import { userCreators } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { getCookie } from "./Cookie";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getCookie("token")) {
      dispatch(userCreators.loginCheckDB());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <Header />
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/mypage" component={Mypage} />
        <Route exact path="/challenge" component={ChallengeCreate} />
        <Route
          exact
          path="/search/1/:searchWords"
          component={SearchChallenge}
        />
        <Route path="/challenge/:id" component={ChallengeDetail} />
        <Route exact path="/challenge/:id/edit" component={ChallengeEdit} />
      </ConnectedRouter>
    </ThemeProvider>
  );
}

export default App;
