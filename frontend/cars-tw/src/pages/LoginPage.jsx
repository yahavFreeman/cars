import { useEffect, useRef, useState } from "react"
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

    useEffect(()=>{
        usernameRef.current.focus()
    },[])

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
                <h3>Login to view our cars</h3>
                <input ref={usernameRef} required type="text" name="username" placeholder="enter username" value={user.name}  onChange={handleChange}/>
                <input required type="text" name="password" placeholder="enter password" value={user.password} onChange={handleChange}/>
                <button className="login-submit-btn">Login</button>
            </form>
        </div>
    )
}