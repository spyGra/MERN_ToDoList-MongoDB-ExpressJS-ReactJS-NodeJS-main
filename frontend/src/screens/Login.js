import {useHistory} from "react-router-dom";
import {useTaskContext} from "../context/toDoContext";
import {useEffect} from "react";
import "./login.scss";
import LoginHeader from "../components/LoginHeader";


const Login = () => {
    const {userLogin, handleLogin, setInputUser, inputUser} =useTaskContext()
    const history = useHistory()

    useEffect(()=>{
        if(userLogin?.[0]?._id){
            sessionStorage.setItem('userId', `${userLogin?.[0]?.userName}`)
            history.push("/admin/home")
        }
    },[userLogin])

    return(
        <>
            <LoginHeader />
            <form onSubmit={(e)=> handleLogin(e)} className="login_container">
                <input
                    className="login_input"
                    required
                    placeholder="Name"
                    autoComplete="off"
                    type="text"
                    value={inputUser.userName}
                    name="userName"
                    onChange={(e)=>setInputUser({...inputUser, userName: e.target.value})}
                />
                <input
                    className="login_input"
                    required
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                    value={inputUser.userPassword}
                    name="userPassword"
                    onChange={(e)=>setInputUser({...inputUser, userPassword: e.target.value})}
                />
                <button type="submit" className="login_buttons">Login</button>
                <button className="login_buttons" onClick={()=> history.push("/register")}>Register</button>
            </form>
        </>

    )
}

export default Login;