import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import configureStore from '../shared/redux/configureStore/communityUserPage';
import App from '../shared/CommunityUser/App';
import '../lib/tabs';
import '../assets/index.css';
import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

// Grab the server serialized state off of the window object.
const initialState = window.__PRELOADED_STATE__;
// const initialStateRoute = window.__SERIALIZED_STATE__;
//

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Instead of starting Redux with an empty initial state on the server,
// you pass the server data into the Redux setup.
// const storeRoute = initRedux(initialStateRoute);
const store = configureStore(initialState);

/*
 * Main entry point for the client side isomorphic app
 */
const renderRouter = (Component, store) => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>, document.getElementById('root')
  );
};

// Wrapping App inside of Provider
// render(RecipeApp, store);
renderRouter(App, store);
