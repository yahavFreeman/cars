import {userService} from "../../services/userService"

export function login(user) {
    return async (dispatch) => {
        try {
            const loggedUser = await userService.login(user)
            dispatch({type:"USER/LOGIN", loggedUser})
        } catch (error) {
            console.log(error)
        }
    }
}

export function checkRefreshToken() {
    return async (dispatch) => {
        try {
            const loggedUser = await userService.checkRefreshToken()
            dispatch({type:"USER/LOGIN", loggedUser})
        } catch (error) {
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            console.log("inlog")
            await userService.logout()
            console.log("outlog")

            dispatch({type: "USER/LOGOUT"})
        } catch (error) {
            console.log(error)
        }
    }
}