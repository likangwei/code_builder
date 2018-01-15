import axios from "axios"


export function addNewColumn(data, successCallback, failCallback) {
    let api = "/api/column/add"
    axios.post(api, data).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}

export function saveOrUpdateColumn(data, successCallback, failCallback) {
    if(data.id == null || data.id == 0){
        addNewColumn(data, successCallback, failCallback)
    }else{
        let api = "/api/column/" + data.id
        axios.put(api, data).then(function (response) {
            successCallback(response.data)
        }).catch(function (reason) {
            failCallback(reason)
        })
    }
}


export function fetchColumn(id, successCallback, failCallback) {
    let api = "/api/column/" + id
    axios.get(api).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}


export function getColumnList(successCallback, failCallback) {
    let api = "/api/column/"
    axios.get(api).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}