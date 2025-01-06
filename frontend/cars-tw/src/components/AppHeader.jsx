import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppHeader = () => {
  const { user } = useSelector((state) => state.userModule);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleHomePage = () => {
    navigate("/cars")
  }
  useEffect(() => {
    if (!user?.accessToken) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!(user?.accessToken))
    return (
      <div className="main-layout">
        <div className="header-container">
          <div className="welcome">Hello, Guest</div>
          <p>Login</p>
        </div>
      </div>
    );
  return (
    <div className="main-layout">
      <div className="header-container">
        <div className="welcome" onClick={handleHomePage}>Hi, {user.username}</div>
        <p onClick={handleLogout}>Logout</p>
      </div>
    </div>
  );
};
