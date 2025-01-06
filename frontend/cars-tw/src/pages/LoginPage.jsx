import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.userModule);

  const [userToLogin, setUser] = useState({
    ID: null,
    username: "",
    password: "",
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  useEffect(() => {
    if (accessToken) {
      // Navigate only after successful login
      navigate("/cars");
    }
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userToLogin));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userToLogin, [name]: value });
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit} className="login-page-form">
        <h3>Login to view our cars</h3>
        <input
          ref={usernameRef}
          required
          type="text"
          name="username"
          placeholder="enter username"
          value={userToLogin.username}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="password"
          placeholder="enter password"
          value={userToLogin.password}
          onChange={handleChange}
        />
        <button className="login-submit-btn">Login</button>
      </form>
    </div>
  );
};
