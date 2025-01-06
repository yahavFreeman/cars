import { userService } from "../../services/userService";

export function login(user) {
  return async (dispatch) => {
    try {
      const loggedUser = await userService.login(user);
      dispatch({ type: "USER/LOGIN", loggedUser });
    } catch (error) {
      console.log(error);
    }
  };
}

export function checkRefreshToken() {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER/REFRESH_TOKEN_START" });
      const loggedUser = await userService.checkRefreshToken();
      dispatch({ type: "USER/LOGIN", loggedUser });
      dispatch({ type: "USER/REFRESH_TOKEN_END" });

      // Return the logged user for chaining if needed
      return loggedUser;
    } catch (error) {
      // Dispatch an action to handle the error if necessary
      dispatch({ type: "USER/REFRESH_TOKEN_FAILED", error });
      throw error; // Re-throw for the caller to handle
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();

      dispatch({ type: "USER/LOGOUT" });
    } catch (error) {
      console.log(error);
    }
  };
}
