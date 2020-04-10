import React from 'react';
import { renderRoutes } from 'react-router-config';

class Main extends React.Component {
  render() {
    const appProps = {
      user: this.props.user,
      actions: this.props.actions
    }
    return (
      <div>
        {renderRoutes(this.props.routes, appProps)}
      </div>
    )
  }
}
export default Main;
