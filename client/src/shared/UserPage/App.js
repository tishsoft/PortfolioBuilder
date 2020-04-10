import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { getRoutes } from './routes';
import * as actionCreators from '../redux/actions/page';

class AppContainer extends React.Component {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

const App = ({ state, actions }) => (
  <div>
    {renderRoutes(getRoutes(state.user.info), {state, actions})}
  </div>
);

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  return {
    state: state
  };
}

// This function lets you make actions simpler to call from the component.
// Normally you have to call dispatch(action) each time you want to call an action.
// This allows the view to call the action without knowing about dispatch.
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

// Instead of exporting the App component, you export the connect component,
// which takes in the two helper functions and the App component as parameters.
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
// export default App;
