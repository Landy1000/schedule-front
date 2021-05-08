import './App.css';

import React from 'react';
import Router from "./Router";
import {Header} from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  );
}

export default App;
