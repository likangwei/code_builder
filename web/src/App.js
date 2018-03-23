import React, { Component } from 'react';
import './App.css';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {ModelList} from './model/ModelList'
import {ModelDetail} from './model/ModelDetail'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import CurlToCode from './CurlToCode'



class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
              <Drawer open={true}>
                <MenuItem><Link to="/models">模型</Link></MenuItem>
                <MenuItem><Link to="/curl-to-code">CurlToCode</Link></MenuItem>
              </Drawer>

              <div style={{"marginLeft": "280px", "height": "100%"}}>
                <Route path="/models" component={ModelList} />
                <Route path="/model/:id" component={ModelDetail} />
                <Route path="/curl-to-code" component={CurlToCode} />
              </div>
          </div>

      </Router>
      </MuiThemeProvider>

    );
  }
}

export default App;
