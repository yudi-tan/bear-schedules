import React, { Component } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import './all.css';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <div className="container">
          <Header />
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
