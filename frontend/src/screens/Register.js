import {useHistory} from "react-router-dom";
import { useTaskContext } from "../context/toDoContext";
import "./login.scss";
import RegisterHeader from "../components/RegisterHeader";

const Register = () => {

    const {inputUser, setInputUser,handleNewUserRegistrationClick} = useTaskContext()

    const history = useHistory()

    return(
        <>
            <RegisterHeader />
            <form onSubmit={(e)=>handleNewUserRegistrationClick(e)} className="login_container">
                <input
                    className="login_input"
                    placeholder="Name"
                    autoComplete="off"
                    type="text"
                    value={inputUser.userName}
                    name="userName"
                    required
                    onChange={(e)=>setInputUser({...inputUser, userName: e.target.value})}
                />
                <input
                    className="login_input"
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                    value={inputUser.userPassword}
                    name="userPassword"
                    required
                    onChange={(e)=>setInputUser({...inputUser, userPassword: e.target.value})}
                />
                <button className="login_buttons"  type="submit" >Register</button>
                <button className="login_buttons" onClick={()=> history.push("/")}>Back</button>
            </form>
        </>

    )
}

export default Register;