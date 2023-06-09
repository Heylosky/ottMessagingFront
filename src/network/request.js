import axios from 'axios'

export function requestGet2(config, success, failure) {
    const instance10 = axios.create({
        baseURL: 'https://www.sdesk.tech:8082',
        timeout: 5000,
    })
    instance10(config).then(res => {
        success(res)
    }).catch(err => {
        failure(err)
    })
}

export function requestPost(url, data, config, success, failure) {
    const instancePost = axios.create({
        method: 'post',
        baseURL: 'https://www.sdesk.tech:8082',
        headers: {
            "Content-Type": "application/json"
        },
    })
    instancePost.post(url, data, config).then(res => {
        success(res)
    }).catch(err => {
        failure(err)
    })
}