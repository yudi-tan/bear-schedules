import React, { Component } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import './all.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div id="wrapper">
        <div className="container">
          
            <Header />
            <Main />
          
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
