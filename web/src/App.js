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




class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
              <Drawer open={true}>
                <MenuItem><Link to="/models">模型</Link></MenuItem>
              </Drawer>
              <div style={{"marginLeft": "280px", "height": "100%"}}>
                <Route path="/models" component={ModelList} />
                <Route path="/model/:id" component={ModelDetail} />
              </div>
          </div>

      </Router>
      </MuiThemeProvider>

    );
  }
}

export default App;
