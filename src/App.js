import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import ChallengeDetail from "./pages/ChallengeDetail";
import ChallengeCreate from "./pages/ChallengeCreate";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route exact path="/challenge/:id" component={ChallengeDetail} />
        <Route exact path="/challenge" component={ChallengeCreate} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
