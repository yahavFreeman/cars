import jwt from "jsonwebtoken";
import "dotenv/config";

let refreshTokenName = "refreshToken";

async function login(req, res) {
  const { username, password } = req.body;
  try {
    // this is just instead of really logging and creating a users table
    // since I wanted just the basic mechanism for JWT implementation.
    const loggedUser = {
      ID: 1,
      username,
      password,
    };
    delete loggedUser.password;
    const refreshToken = jwt.sign(
      // source of truth refresh token
      {
        data: loggedUser,
      },
      process.env.JWT_REFRESH_SECRET, // value in README.md file
      {
        expiresIn: "2 days", //the refresh token is an http only, meaning only the backend can have access to it
      }
    );
    console.log("refreshToken: ", refreshToken);
    const accessToken = jwt.sign({ data: loggedUser }, process.env.JWT_SECRET, {
      expiresIn: "15m", //access token is being set for 15 mins, for security messures,
      // since if we were to keep it stored, like in a cookie, JS would have access to it, so we want to keep it in the front's state and with a minimal time frame for security
    });
    loggedUser.accessToken = accessToken; //adding the access token in memory instead of storing it for JS access like the refresh token.
    res.cookie(refreshTokenName, refreshToken, {
      httpOnly: true, // this means that the cookie is harder to reach, it is accessible only by the server
    });
    res.json(loggedUser);
  } catch (err) {
    console.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to Login" });
  }
}

async function checkRefreshToken(req, res) {
  //this function is incharge of keeping the user logged in after his access token got expired.
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.json({ message: "No token" });

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET).data; //verifying the refreshToken
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      //creating a new access token since the use has a valid refresh toke
      expiresIn: "15m",
    });
    user.accessToken = accessToken;
    res.json(user); // sending a user with a new valid access token for a login procedure.
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie(refreshTokenName); // removing the refresh token, the access token is the responsibility of the front to remove from it's state.
    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);
    res.status(200).send({ msg: "logged out successfully" });
  } catch (err) {
    res.status(500).send({ err: "Failed to logout" });
  }
}

export { login, logout, checkRefreshToken };
