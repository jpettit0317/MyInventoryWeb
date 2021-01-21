import './App.css';
import React from 'react';
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { Route, Switch, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import SignUpPageViewModel from "./viewmodels/SignUpPageViewModel";
import LoginPageViewModel from "./viewmodels/LoginPageViewModel";
import RoutePath from "./enums/RoutePath_enum";
import SignUpNetworkCallManager from "./utils/SignUpNetworkCallManager";
import FullApiURL from "./enums/FullApiURL_enum";
import LoginNetworkCallManager from './utils/LoginNetworkCallManager';

function App() {
  const loginNetworkCallManager = LoginNetworkCallManager.createLoginNetworkCallManager(FullApiURL.verifyUser);
  const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "", loginNetworkCallManager);  
  const signUpPageViewModel = createSignUpPageViewModel(FullApiURL.createUser);

  function createSignUpPageViewModel(urlString: string = "") : SignUpPageViewModel {
    const newNetworkCallManager = SignUpNetworkCallManager.createNetworkManager(urlString);
    return SignUpPageViewModel.createEmptyViewModel(newNetworkCallManager);
  }

  return (
    <div>
      <NavBar navBarTitle="MyInventory" />
      <BrowserRouter>
        <Switch>
          <Route 
             path={RoutePath.login} 
             component={LoginPage} 
          />
          <Route 
             path={RoutePath.signup} 
             component={ () => <SignUpPage signUpPageViewModel={signUpPageViewModel} /> } 
          /> 
          <Route 
             path={RoutePath.home} 
             component={() => <LoginPage loginPageViewModel={loginPageViewModel} />} 
          />
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
