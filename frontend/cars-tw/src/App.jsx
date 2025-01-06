import "./style/style.scss";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CarsPage } from "./pages/CarsPage";
import { LoginPage } from "./pages/LoginPage";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkRefreshToken } from "./store/actions/userActions";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const { accessToken, refreshTokenValidation } = useSelector(
    (state) => state.userModule
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchRestartToken = async () => {
      await dispatch(checkRefreshToken());
    };
    fetchRestartToken();
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && accessToken) {
      navigate("/cars"); // this is the apps main page, so the user wont see the login page again
    } else if (location.pathname !== "/" && accessToken) {
      navigate(location.pathname); // going to any route on webpage refresh
    } else {
      navigate("/"); // login fallback
    }
  }, [accessToken]);

  if (refreshTokenValidation) {
    return <></>;
  }

  return (
    <div className="App">
      <AppHeader className="App-header" />
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/cars" element={<CarsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
