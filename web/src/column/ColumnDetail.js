import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export class ColumnForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            "data": {},
        }
    }

    render(){

        let typeChoics = ["int", "string", "text", "date", "datetime"]

        let sels = []
        for(var i=0; i<typeChoics.length; i++){
              sels.push(<MenuItem value={typeChoics[i]} primaryText={typeChoics[i]} />)
        }

        return (
            <div>
                <TextField
                    value={this.state.name}
                    floatingLabelText="名称"
                    floatingLabelFixed={true}
                    onChange={ evt => this.onTitleChange(evt.target.value)}
                />
                <SelectField
                    value={this.state.name}
                    floatingLabelText="类型"
                    onChange={ evt => this.onTypeChange(evt.target.value)}
                >
                {sels}
                </SelectField>
                <TextField
                    value={this.state.name}
                    floatingLabelText="COMMONT"
                    floatingLabelFixed={true}
                    onChange={ evt => this.onTitleChange(evt.target.value)}
                />
            </div>
        )
    }
}