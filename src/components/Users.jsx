import { useState,useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try{
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                    
                });
                console.log(response.data)
                isMounted && setUsers(response.data)
            }
            catch(err){
                if (axios.isCancel(err)) return
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
            }
        }

        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);

  return (
    <article>
        <h2>Users List</h2>
        {users?.length 
            ? (
                <ul style = {{listStyleType: "none", padding: 0, margin: 0}}>
                    {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                </ul>
            ) : <p> No User to display.</p>
        }
    </article>
  )
}

export default Users