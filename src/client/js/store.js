import { applyMiddleware, createStore } from "redux";


import thunk from "redux-thunk";
import {routerMiddleware} from "react-router-redux";

import reducer from "./reducers";

import history from "./history";

const middleware = applyMiddleware(thunk);

export default createStore(reducer, {}, middleware);
