import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../store/actions/userActions";

export const LoginPage = ()=> {
    const usernameRef = useRef()
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        ID:null,
        username: "",
        password:"",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(user))
    }

        const handleChange = (e) => {
            const { name, value } = e.target;
            setUser({ ...user, [name]: value });
          };

    return (
        <div className="login-page-container">
            <form onSubmit={handleSubmit} className="login-page-form">
                <input required type="text" name="username" placeholder="enter username" value={user.name}  onChange={handleChange}/>
                <input required type="text" name="password" placeholder="enter password" value={user.password} onChange={handleChange}/>
                <button className="login-submit-btn">Login</button>
            </form>
        </div>
    )
}