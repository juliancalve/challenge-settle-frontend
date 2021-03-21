import './App.scss';
import './styles/global.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

function App(): JSX.Element {
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
