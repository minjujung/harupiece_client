import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import ChallengeDetail from "./pages/ChallengeDetail";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route exact path="/challenge/:id" component={ChallengeDetail} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
