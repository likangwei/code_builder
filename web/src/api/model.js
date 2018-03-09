import axios from "axios"


export function saveModel(model, successCallback, failCallback) {
    let api = "/api/model/add"
    axios.post(api, model).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })
}


export function saveOrUpdateModel(data, successCallback, failCallback) {
    if(data.id == null || data.id == 0){
        saveModel(data, successCallback, failCallback)
    }else{
        let api = "/api/model/" + data.id
        axios.put(api, data).then(function (response) {
            successCallback(response.data)
        }).catch(function (reason) {
            failCallback(reason)
        })
    }
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

export function buildCode(modelId, successCallback, failCallback){
    let api = "/api/model/" + modelId + "/build"
    axios.get(api).then(function (response) {
        successCallback(response.data)
    }).catch(function (reason) {
        failCallback(reason)
    })

}