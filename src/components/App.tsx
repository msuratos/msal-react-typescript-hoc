import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";

import logo from '../logo.svg';
import './App.css';

import { username } from '../redux/authSlice';
import { WithAzureAdProps, withAzureAd } from '../utils/authProvider';
import SecuredComponent from './SecuredComponent/SecuredComponent'

interface AppProps extends WithAzureAdProps {
  username: Function
}

class App extends React.Component<AppProps> {
  state = {
    isAuthenticated: false
  }

  async componentDidMount() {
    try {
      const response = await this.props.signin();
      this.props.username(response.account.username);

      if (response)
        this.setState({ isAuthenticated: true });
    }
    catch (error) {
      console.log('Error from App sigin', error);
    }
  }

  render() {
    const { ...props } = this.props;

    return (
      <div>
        {
          !this.state.isAuthenticated ? <h1>Not Authenticated </h1> :
            <Router>
              <Switch>
                <Route path="/" exact>
                  <div className="App">
                    <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                      </p>
                      <a className="App-link">Learn React</a>
                      <Link to="/securecomponent">Secure Component</Link>
                    </header>
                  </div>
                </Route>
                <Route path="/securecomponent" exact>
                  <SecuredComponent {...props as WithAzureAdProps} />
                </Route>
              </Switch>
            </Router>
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  username
};

export default connect(null, mapDispatchToProps)(withAzureAd(App));
