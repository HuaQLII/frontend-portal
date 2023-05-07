import service from "@/request/index";
import {LoginFormInit} from "@/types/login";


export function Login(data: LoginFormInit) {
    return service({
        url: '/v1/user/login',
        method: 'get',
        data
    })
}
export function Login1() {
    return service({
        url: '/v1/user/login',
        method: 'get',
    })
}