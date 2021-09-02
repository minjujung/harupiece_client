import { createStore, combineReducers, applyMiddleware, compose } from "redux";

// middleware
import thunk from "redux-thunk";

// redux router
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// reducers
import user from "./modules/user";
import main from "./modules/main";
import ChallengeDetail from "./modules/challengeDetail";
import Post from "./modules/post";
import Image from "./modules/image";
import Create from "./modules/challengeCreate";
import mypage from "./modules/mypage";
import Chat from "./modules/chat";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  post: Post,
  image: Image,
  challengeDetail: ChallengeDetail,
  create: Create,
  main,
  user,
  mypage,
  chat: Chat,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

export const consoleLogger = (name, msg) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
