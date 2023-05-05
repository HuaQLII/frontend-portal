import service from "@/request/index";
import {LoginFormInit} from "@/types/login";


export function Login(data: LoginFormInit) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}
