import React from 'react';
import { postToApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import TopNav from '../../../components/TopNavUser/Main';
import GeneralForm from './GeneralForm';
import AboutForm from './AboutForm';

const statusClassName = {
  error: 'alert-danger',
  success: 'alert-success',
  info: 'alert-info'
};

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertColor: statusClassName.success,
      showAlertBox: false,
      alertMsg: 'Alert Message'
    };
  }
  handleGeneralSubmit(formFields) {
    const userId = this.props.user.info._id;
    const url = apiLink.userById(userId);
    const data = { formFields, userId };
    const flashStatusMsg = (status, msg) => this.showAlert(status, msg);
    const cbFailure = flashStatusMsg;
    const redirect = (username) => {
      window.location = `/@${username}/settings`
    }
    const oldUsername = this.props.user.info.username;
    const newUsername = formFields.username ? formFields.username : oldUsername;

    // For the success case, make a redux fetch for state again so that
    // when we navigate to the profile page, the latest data is shown
    const cbSuccess = (status, msg) => {
      if (status === 'error') {
        flashStatusMsg(status, msg);
      } else {
        this.props.actions.getUserProfileData(newUsername, newUsername);
        (oldUsername === newUsername) ? flashStatusMsg(status, msg) : redirect(newUsername);
      }
    }
    postToApiData(url, data, cbFailure, cbSuccess);
  }
  handleAboutSubmit(formFields) {
    const userId = this.props.user.info._id;
    const url = apiLink.userAboutById(userId);
    const data = { formFields, userId };
    const flashStatusMsg = (status, msg) => this.showAlert(status, msg);
    const cbFailure = flashStatusMsg;
    const cbSuccess = (status, msg) => {
      if (status === 'error') {
        flashStatusMsg(status, msg);
      } else {
        const username = this.props.user.info.username;
        this.props.actions.getUserProfileData(username, username);
        flashStatusMsg(status, msg);
      }
    }
    postToApiData(url, data, cbFailure, cbSuccess);
  }
  showAlert(status, msg) {
    const toWait = 3000; // 3 seconds
    // NOTE: what's happening below is we want to show alert box for three seconds with
    // the right color and alert message. After three seconds, the alert box disappears
    this.setState({
      alertColor: statusClassName[status],
      showAlertBox: true,
      alertMsg: msg
    });
    setTimeout(() => this.setState({
      showAlertBox: false
    }),
    toWait);
  }
  handleCloseAlertBox() {
    this.setState({ showAlertBox: false });
  }
  renderAlertBox(show, msg, statusClassName) {
    const hide = show ? '' : 'hide';
    return (
      <div className={`row ${hide}`} id="alert-box">
        <div className="col s12 m12">
          <div className={`center ${statusClassName}`}>
            <div className="row">
              <div className="col s12 m12 l12">
                <div style={{ padding: 8 }}>
                  { msg }
                </div>
              </div>
              {
                <div className="col s12 m2">
                  <i
                    className="fa fa-times"
                    id="alert-close"
                    onClick={this.handleCloseAlertBox.bind(this)}
                  />
                </div>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user.info} />
        { this.renderAlertBox(this.state.showAlertBox,
                              this.state.alertMsg,
                              this.state.alertColor)
        }
        <div className="container">
          <h2>Settings</h2>
          <GeneralForm
            userId={this.props.user.info._id}
            email={this.props.user.info.email}
            displayName={this.props.user.info.displayName}
            username={this.props.user.info.username}
            picture={this.props.user.info.picture}
            handleSubmit={formFields => this.handleGeneralSubmit(formFields)}
          />
          <AboutForm
            userId={this.props.user.info._id}
            bio={this.props.user.info.bio}
            location={this.props.user.info.location}
            website={this.props.user.info.website}
            interests={this.props.user.info.interests}
            handleSubmit={formFields => this.handleAboutSubmit(formFields)}
          />
        {
          // <div className="card-panel white">
          //   <h5>Deactivate account</h5>
          //   <p>
          //     {
          //       'Deactivating your account will remove it from LooseLeaf. You can sign back in anytime to reactivate your account and restore its content.'
          //     }
          //   </p>
          //   <a href="">Deactivate account</a>
          //   <div className="or-divider" />
          //   <h5>Delete account</h5>
          //   <p>
          //     {
          //       'Permanently delete your account and all of your content.'
          //     }
          //   </p>
          //   <a href="">Delete account</a>
          // </div>
        }

        </div>
      </div>
    );
  }
}
