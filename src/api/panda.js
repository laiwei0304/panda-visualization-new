import request from "../utils/request";

export function FindAllPanda() {
    return request({
        url: '/panda',
        method: 'get'
    })
}
