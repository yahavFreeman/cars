const INITIAL_STATE = {
  user: {},
  accessToken: null,
  isLoadingUser: true,
  refreshTokenValidation: false,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USER/LOGIN":
      return {
        ...state,
        user: action?.loggedUser || INITIAL_STATE.user,
        accessToken:
          action?.loggedUser?.accessToken || INITIAL_STATE.accessToken,
        isLoadingUser: false,
      };
    case "USER/REFRESH_TOKEN_START":
      return {
        ...state,
        refreshTokenValidation: true,
      };
    case "USER/REFRESH_TOKEN_END":
      return {
        ...state,
        refreshTokenValidation: false,
        isLoadingUser: false,
      };
    case "USER/LOGOUT":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
}
