import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {saveModel} from '../api/model'
import {Tabs, Tab} from 'material-ui/Tabs';

export class CodeDialog extends Component{

    constructor(props){
        super(props)
        this.state = {
            open: props.open,
            data: props.data,
        }
    }

    componentWillReceiveProps(props){
        console.log("componentWillReceiveProps")
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
     handleChange = (value) => {
        this.setState({
          value: value,
        });
      };
    render(){
        let data = this.state.data
        let tabs = []
        for (var k in data){
            tabs.push(
                <Tab
                  key={k}
                  label={k} value={k}
                 >
                    <TextField
                        style={{"width": "100%", "height": 10}}
                        value={data[k]}
                        multiLine={true}
                        rowsMax={15}
                    />
                </Tab>
            )
        }
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
          style={{"height":"80%"}}
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <Tabs style={{"height":"500px"}}

            value={this.state.value}
            onChange={this.handleChange}
          >
        {tabs}
        </Tabs>

        </Dialog>
        );
    }
}
