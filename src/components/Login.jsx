import { useRef,useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link,useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import axios from "../api/axios";
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errorRef = useRef();

    const [user, reset, attributeObj] = useInput('user','');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);
    
    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[user, pwd])

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post(LOGIN_URL,{ user, pwd },
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response?.data)

            const accessToken = response?.data.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            //setUser('');
            reset();
            setPwd('');
            navigate(from, {replace: true});
        } catch(err){
            if(!err?.response) {
                setErrMsg('No response from Server');
            }
            else if (err.response?.status === 400){
                setErrMsg('Missing Username and Password');
            }
            else if (err.response?.status === 401){
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Log-in Failed');
            }
            errorRef.current.focus();
        }

        
    }
    // const togglePersist = () => {
    //     setPersist(prev => !prev);
    // }

    // useEffect(() => {
    //     localStorage.setItem("persist", persist);
    // },[persist])

  return (
    
    <section>
        <p ref = {errorRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input 
                type = "text" 
                id="username"
                ref={userRef}
                autoComplete="off"
                // onChange={(e) => setUser(e.target.value)}
                // value={user}
                {...attributeObj}
                required
            />
            <label htmlFor="password">Password: </label>
            <input 
                type = "password" 
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
            />
            <button>Sign In</button>
            <div className="persistCheck">
                <input 
                    type="checkbox" 
                    id = "persist"
                    onChange={toggleCheck}
                    checked={check}
                />
                <label htmlFor="persist">Trust This Device</label>
            </div>
        </form>
        <p>
            Need an Account?<br/>
            <span className="line">
                {/*put rounter link here*/}
                <Link to = "/register">Sign Up</Link>
            </span>
        </p>
    </section>
  )
}

export default Login