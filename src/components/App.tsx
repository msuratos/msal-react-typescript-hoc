import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';

import logo from '../logo.svg';
import './App.css';

import { WithAzureAdProps, withAzureAd } from '../utils/authProvider';
import SecuredComponent from './SecuredComponent/SecuredComponent'

class App extends React.Component<WithAzureAdProps> {
  state = {
    isAuthenticated: false
  }

  async componentDidMount() {
    const response = await this.props.signin;

    if (response)
      this.setState({ isAuthenticated: true });
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
                  <SecuredComponent {...props} />
                </Route>
              </Switch>
            </Router>
        }
      </div>
    );
  }
}

export default withAzureAd(App);
