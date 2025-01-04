const INITIAL_STATE = {
    user:{},
    accessToken:null
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "USER/LOGIN":
            return {
                ...state,
                user: action?.loggedUser,
                accessToken: action?.loggedUser?.accessToken
            }
        
        case "USER/LOGOUT":
            console.log(action)
            return {
                ...state,
                user: INITIAL_STATE.user,
                accessToken: INITIAL_STATE.accessToken
            }
        default:
            return state;
    }
}