import "./style/style.scss";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CarsPage } from "./pages/CarsPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { checkRefreshToken } from "./store/actions/userActions";
import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";


function App() {
  const { user } = useSelector((state) => state.userModule);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // On initial load, check refresh token or login status
    dispatch(checkRefreshToken())
      .finally(() => {
        setIsLoading(false)}); // End loading once check is complete
  }, [dispatch]);

  useEffect(() => {
    // Redirect based on user status to keep user logged in
    if (!isLoading) {
      if (user?.accessToken) {
        navigate("/cars");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  if (isLoading) {
    return <div className="app-loading-placeholer"></div>;
  }

  return (
    <div className="App">
       <AppHeader className="App-header" user={user}/>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
      </main>
      <AppFooter/>
    </div>
  );
}

export default App;
