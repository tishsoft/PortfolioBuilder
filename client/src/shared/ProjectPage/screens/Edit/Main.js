import React from 'react';
import TopNav from '../../../components/TopNavUser/Main';
import ProjectForm from './ProjectForm';
import { apiLink } from '../../../data/apiLinks';
import { getApiData } from '../../../../lib/helpers';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: {},
      communities: []
    }
  }
  componentDidMount() {
    this.loadPeople();
    this.loadCommunities();
  }
  loadPeople() {
    const url = apiLink.users;
    const setApiData = users => {
      const people = users.map(user => {
        const tmp = {};
        tmp[`@${user.username}`] = {picture: user.picture, id: user._id};
        return tmp;
      }).reduce((acc, x) => {
        for (const key in x) acc[key] = x[key];
        return acc;
      }, {});
      this.setState({people: people})
    }
    getApiData(url, setApiData);
  }
  loadCommunities() {
    // TODO: do not loadCommunities. Just import from data/communities.json
    const url = apiLink.communities;
    const setApiData = communities => {
      const names = communities.map(community => {
        return {
          slug: community.slug,
          name: community.name
        };
      });
      this.setState({communities: names})
    }
    getApiData(url, setApiData);
  }
  // TODO: If there's a lot of text for desc, need to trigger expansion of
  // input field
  render() {
    return (
      <div className="section-white" id="project-form">
        <TopNav route={this.props.route} user={this.props.user.loggedinUser} useExternLinks />
        <div className="container">
          <h4>Edit Project</h4>
          <ProjectForm
            history={this.props.history}
            user={this.props.user.loggedinUser}
            creator={this.props.projectInfo.creator}
            people={this.state.people}
            title={this.props.projectInfo.title}
            desc={this.props.projectInfo.desc}
            selectedCommunities={this.props.projectInfo.communities}
            selectedDeliverableFormats={this.props.projectInfo.deliverable.formats}
            selectedInterestAreas={this.props.projectInfo.interestAreas}
            actionBtn={{
              label: 'Update Project',
              postUrl: apiLink.projectBySlug(this.props.projectInfo.slug),
              getProjectData: this.props.actions.getProjectData
            }}
            />
        </div>
      </div>
    );
  }
}
