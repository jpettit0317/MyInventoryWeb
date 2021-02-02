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
import MyInventory from "./components/MyInventory";

function App() {
  function createSignUpPage() : JSX.Element {
    return <SignUpPage firstName="" lastName="" username="" email="" password="" confirmedPassword="" />;
  }

  return (
    <div>
      <NavBar navBarTitle="MyInventory" />
      <BrowserRouter>
        <Switch>
          <Route
            exact path={RoutePath.home}
            component={() => <LoginPage username="" password="" />}
          />
          <Route
            exact path={RoutePath.myinventory}
            component={MyInventory}
          />
          <Route
            exact path={RoutePath.signup}
            component={() => createSignUpPage()}
          /> 
          <Route 
             exact path={RoutePath.login} 
             component={LoginPage} 
          />
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
