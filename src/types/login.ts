export interface LoginFormInit {
    username: string;
    password: string;
}
export class LoginFormData {
    ruleForm:LoginFormInit={
        username : "",
        password : ""
    }
}