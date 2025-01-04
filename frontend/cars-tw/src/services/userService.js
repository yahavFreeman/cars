import { httpService } from "./http.service";

async function login(user) {
    return await httpService.post("auth/login",user)
    
}

async function logout() {
    return await httpService.post("auth/logout", {})
    
}

async function checkRefreshToken() {
    return await httpService.post("auth/refresh-token",)
}

export const userService = {
    login,
    checkRefreshToken,
    logout
}