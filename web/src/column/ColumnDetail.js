import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {saveOrUpdateColumn} from '../api/column'

export class ColumnForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            "data": props.data,
        }
    }

    save(){
        saveOrUpdateColumn(this.state.data, function (response) {

        }, function (reason) {
            console.log(reason)
        })
    }

    onNameChange(name){
        this.state.data.name = name
        this.setState(this.state)
    }

    onCommentChange(comment){
        this.state.data.comment = comment
        this.setState(this.state)
    }

    onTypeChange(type){
        console.log(type)
        this.state.data.type = type
        this.setState(this.state)
    }

    render(){

        let typeChoics = ["int", "string", "text", "date", "datetime"]

        let sels = []
        for(var i=0; i<typeChoics.length; i++){
          let val = typeChoics[i]

          sels.push(
            <MenuItem
              value={val}
              primaryText={val}
            />
          )
        }

        return (
            <div>
                <TextField
                    value={this.state.data.name}
                    floatingLabelText="名称"
                    floatingLabelFixed={true}
                    onChange={ evt => this.onNameChange(evt.target.value)}
                />
                <SelectField
                    value={this.state.data.type}
                    floatingLabelText="类型"
                    onChange={ (evt, idx, val) => this.onTypeChange(val)}
                >
                {sels}
                </SelectField>
                <TextField
                    value={this.state.data.comment}
                    floatingLabelText="COMMONT"
                    floatingLabelFixed={true}
                    onChange={ evt => this.onCommentChange(evt.target.value)}
                />
                <RaisedButton label="保存" onClick={()=>this.save()}/>
            </div>
        )
    }
}