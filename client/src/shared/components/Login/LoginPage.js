import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import appRoute from '../../data/appRoute';
import LegalInfo from './LegalInfo';

const LoginPage = ({ route }) => (
  <div className="section-white row" style={{ minHeight: '45em' }}>
    <div className="col s12 m10 l10 offset-m1 offset-l1" style={{paddingTop: '50px'}}>
      <LoginForm
        action="Continue"
        header="Login"
        redirPath="/"
      />
      <div className="row center hero">
        <div className="col l12 m12 s12">
          <h6 style={{ marginTop: 40 }}>
            New to LooseLeaf? <Link to={appRoute('signup')}>Sign up</Link>
          </h6>
        </div>
        <LegalInfo />
      </div>
    </div>
  </div>
);

export default LoginPage;
