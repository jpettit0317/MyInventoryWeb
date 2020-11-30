import './App.css';
import React from 'react';
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div>
      <NavBar navBarTitle="MyInventory" />
      <LoginPage />
    </div>
    
  );
}

export default App;
