import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

import {ModelDetail} from './ModelDetail'
import {ModelAddForm} from './ModelAddForm'

import {getModelList} from '../api/model'

export class ModelList extends Component{

    constructor(props){
        super(props)
        this.id = 0
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        let self = this
        getModelList(function(response){
            self.setState({data: response.data})
        }, function (reason) {
            console.log(reason)
        })
    }

    delete(id){
        let url = "/api/loop/" + id
        let self = this
        axios.delete(url).then(function (resp) {
            alert("成功")
        }).catch(function (reason) {
            console.log(reason)
        })
    }

    render(){
        let rows = []
        let data = this.state.data

        for (var i=0; i<data.length; i++){
            let cell = data[i]
            let id = <Link to={"/model/" + cell.id}>{cell.name}</Link>
            let btns = [
                <RaisedButton label="Del" onClick={()=>this.delete(cell.ID)}/>
            ]
            rows.push((
                <TableRow>
                <TableRowColumn>{id}</TableRowColumn>
                <TableRowColumn>{cell.Skips}</TableRowColumn>
                <TableRowColumn>{btns}</TableRowColumn>
                </TableRow>
            ))
        }
        return (
        <div>
        <ModelAddForm />
        <Table>
            <TableHeader>
            <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>操作</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody>
            {rows}
            </TableBody>
        </Table>
        </div>
    )
    }
}

export default withRouter(ModelList);