import "./style/style.scss";
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { CarsPage } from './pages/CarsPage';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { checkRefreshToken } from "./store/actions/userActions";


function App() {
  const { user } = useSelector((state) => state.userModule);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
        if(!user.ID)
        dispatch(checkRefreshToken())
  }, []);

  useEffect(()=>{
    if (user?.ID) {
      navigate("/cars")
    } else{
      navigate("/")
      setIsLoading(false)
    }
  }, [user, navigate])
  if (isLoading) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <div className="App">
      {/* <header className="App-header"/> */}
      <main>
        <Routes>
          <Route path="/" element={< LoginPage />}/>
          <Route path="/cars" element={< CarsPage />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
