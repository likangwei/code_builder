import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {saveModel} from '../api/model'

export class CodeDialog extends Component{

    constructor(props){
        super(props)
        this.state = {
            open: props.open,
            data: props.data,
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            open: props.open,
            data: props.data,
        })
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onTitleChange(text){
        this.setState({name: text})
    }

    render(){
        const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
       return (
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            value={this.state.data}
            multiLine={true}
          />
        </Dialog>
        );
    }
}
