import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import {
    fetchModel,
    saveModel,
    saveOrUpdateModel,
    buildCode,
} from '../api/model'

import {ColumnForm} from '../column/ColumnDetail'
import {CodeDialog} from './CodeDialog'

export class ModelDetail extends Component{

    constructor(props){
        super(props)
        console.log(props)
        this.id = props.match.params.id
        this.state = {
            data: {
                cols: []
            },
            openDialog: false,
            code: "",
        }
    }

    componentDidMount(){
        let self = this
        fetchModel(this.id, function(response){
            if (response.success){
                self.setState({data: response.data})
            }
        }, function (reason) {
            console.log(reason)
        })
    }

    onTitleChange(text){
        let data = this.state.data
        data.name = text
        this.setState({data: data})
    }
    onStepsChange(text){
        this.setState({skips: text})
    }

    save(){
        let self = this
        saveOrUpdateModel(this.state.data, function (response) {
            self.setState(response.data)
        }, function (reason) {
            console.log(reason)
        })
    }

    study(){
        const data = new FormData();
        data.append("loop", this.state.data.LoopId)
        data.append("klowledge", this.state.data.ID)

        let url = "/api/task/"
        axios.post(url, data).then(function (value) {
            console.log(value)
        }).catch(function (reason) {
            console.log(reason)
        })
    }

    onLoopChange(id){
        let data = Object.assign({}, this.state.data)
        data.LoopId = id
        console.log(data)
        this.setState({data: data})
    }

    BuildGormModel(){
        let self = this
        buildCode(this.id, function (response) {
            console.log(response.data)
            self.setState({openDialog: true, code: response.data})
        }, function (reason) {
            console.log(reason)
        })
    }

    addColumn(){
        let cols = this.state.data.cols.slice()
        let self = this
        cols.push({"name": "", "model_id": this.state.data.id})
        this.state.data["cols"] = cols
        this.setState({data: this.state.data})
    }

    render(){
        console.log(this.state)
        let cols = this.state.data.cols
        let colComp = []
        for (var i=0; i<cols.length; i++){
            colComp.push(
                <ColumnForm data={cols[i]} modelId={this.state.data.id} />
            )
        }
        console.log(colComp)
        return (
            <div>
                <TextField
                    value={this.state.data.name}
                    floatingLabelText="名称"
                    floatingLabelFixed={true}
                    multiLine={true}
                    rows={2}
                    onChange={ evt => this.onTitleChange(evt.target.value)}
                />
                <RaisedButton label="保存" onClick={()=>this.save()}/>
                <RaisedButton label="添加字段" onClick={()=>this.addColumn()}/>
                <RaisedButton label="生成Gorm Model" onClick={()=>this.BuildGormModel()}/>
                {colComp}
                <CodeDialog open={this.state.openDialog} data={this.state.code}/>
            </div>
        )
    }
}

