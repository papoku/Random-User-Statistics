import React, { Component } from 'react';
import './css/App.css';
import Header from './components/Header';
import Main from './components/Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
      primary1: blue
  },
  typography: {
    useNextVariants: true,
  }
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <header className="">
          <Header content='Random User Stats' colors="primary" />
        </header>
        <div className="bodyWrapper">
          <Main/>
        </div>
        <footer>
          <Header content='...' colors="primary"/>
        </footer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
