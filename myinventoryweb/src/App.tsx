import './App.css';
import React from 'react';
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { Route, Switch, BrowserRouter, Link, RouteComponentProps } from 'react-router-dom';
import LoginPageViewModel from './viewmodels/LoginPageViewModel';

function App() {
  const loginPageViewModel = LoginPageViewModel.createLoginPageViewModel("", "");  
  return (
    <div>
      <NavBar navBarTitle="MyInventory" />
      <Switch>
        <Route path="/" component={ ()=> <LoginPage loginPageViewModel={loginPageViewModel} /> } />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </div>
    
  );
}

export default App;
