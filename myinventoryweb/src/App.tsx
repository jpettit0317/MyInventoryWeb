import './App.css';
import React from 'react';
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { Route, Switch, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import SignUpPageViewModel from "./viewmodels/SignUpPageViewModel";
import LoginPageViewModel from "./viewmodels/LoginPageViewModel";
import RoutePath from "./enums/RoutePath_enum";

function App() {
  const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "");  
  const signUpPageViewModel = SignUpPageViewModel.createEmptyViewModel();

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
