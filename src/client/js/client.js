import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";
import nHistory from './history';
ReactDOM.render(<Provider store={store}>
    <App history={nHistory}/>
  </Provider>
, document.getElementById('app'));
