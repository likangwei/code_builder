import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import {
  curlToGo
}from './utils/curl-to-go'

var curlconverter = require('curlconverter');

export default class CurlToCode extends Component{

    constructor(props){
        super(props)
        this.state = {
            curl: "",
            goSrc: "",
            pyCode: "",
            jsCode: "",
        }
    }

    onCurlChange = (evt) => {
      let curl = evt.target.value
      let goCode = curlToGo(curl)
      let pyCode = curlconverter.toPython(curl)
      let jsCode = curlconverter.toNode(curl)
      this.setState({curl: curl, goSrc: goCode, pyCode: pyCode, jsCode: jsCode})
    }

    render(){
      const {curl, goSrc, pyCode, jsCode} = this.state
      return (
        <div>
          <TextField 
            style={{width:"50%"}}
            value={curl}
            hintText="curl"
            onChange={this.onCurlChange}
            multiLine={true}
          />
          <TextField 
            style={{width:"50%"}}
            value={goSrc}
            hintText="go code"
            multiLine={true}
          />
          <TextField 
            style={{width:"50%"}}
            value={pyCode}
            hintText="py code"
            multiLine={true}
          />  
          <TextField 
            style={{width:"50%"}}
            value={jsCode}
            hintText="jsCode"
            multiLine={true}
          />
        </div>
      )
    }
}
