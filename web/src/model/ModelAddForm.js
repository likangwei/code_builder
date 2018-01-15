import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {withRouter} from "react-router-dom";

import {saveModel} from '../api/model'

export class ModelAddForm extends Component{

    constructor(props){
        super(props)
        this.id = 0
        this.state = {
            name: "",
        }
    }

    onTitleChange(text){
        this.setState({name: text})
    }

    save(){
        saveModel(this.state, function (response) {

        }, function (reason) {
            console.log(reason)
        })
    }

    render(){
        return (
            <div>
                <TextField
                    value={this.state.name}
                    floatingLabelText="名称"
                    floatingLabelFixed={true}
                    multiLine={true}
                    rows={2}
                    onChange={ evt => this.onTitleChange(evt.target.value)}
                />
                <RaisedButton label="添加" onClick={()=>this.save()}/>
            </div>
        )
    }
}
