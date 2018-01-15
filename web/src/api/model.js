import axios from "axios"


export function saveModel(model, successCallback, failCallback) {
    let api = "/api/model/add"
    axios.post(api, model).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}


export function fetchModel(id, successCallback, failCallback) {
    let api = "/api/model/" + id
    axios.get(api).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}


export function getModelList(successCallback, failCallback) {
    let api = "/api/model/"
    axios.get(api).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}