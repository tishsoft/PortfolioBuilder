import React from 'react';
import TopNav from '../../../components/TopNavUser/Main';
import Discussion from '../../../components/Discussion/Main';
import Stats from './Stats';

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {
  render() {
    const following = this.props.user.info.following;
    const followers = this.props.user.info.followers;
    const projects = this.props.user.info.projects;
    const communities = this.props.user.info.communities;
    const currUser = this.props.user.info._id;
    const context = {name: 'userFeed', queryBy: { following, followers, projects, communities, currUser }}
    return (
      <div className="section-white" style={{minHeight: '100vh'}}>
        <TopNav route={this.props.route} user={this.props.user.info}/>
        <div className="container" id="user-home">
          <div className="row">
            <div className="col s12 m4 l3">
              <Stats user={this.props.user.info} />
            </div>
            <div className="col s12 m8 l9 user-feed">
              <Discussion
                context={context}
                loggedinUser={this.props.user.info}
                noPostDisp='No posts found. To see posts added to your feed, join a community, contribute to a project, or follow other users.'
                readOnly
                showContext
                showContextForUser={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
