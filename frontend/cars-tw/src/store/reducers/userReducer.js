const INITIAL_STATE = {
    user:{},
    accessToken:null
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "USER/LOGIN":
            return {
                ...state,
                user: action.loggedUser.user,
                accessToken: action.loggedUser.user.accessToken
            }
        
        case "USER/LOGOUT":
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
}