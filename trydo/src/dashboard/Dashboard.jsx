import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from "./Sidebar";
import './dashboard.scss'
import { logout } from '../store/actions/userActions';

const Dashboard = ({children}) => {

    const { user } = useSelector(state => state);
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!user.token) history.push("/dashboard/login")
    }, [user.token, history])

    const handleLogout = () => {
        dispatch(logout())

        history.push("/dashboard/login")
    }


    return (
        <div className="dashboard">
            <input type="checkbox" id="nav-toggle" />
            <Sidebar />

            <div className="main-content">
                <header>
                    <h2>
                        Dashboard
                    </h2>
                    {user.token && (

                        <div className="user-wrapper">
                            <img
                                src={user.user.avatar || "https://bit.ly/3bvT89p"}
                                width="40px"
                                height="40px"
                                alt="profile-img"
                            />
                            <div className="">
                                <h4>{user.user.username}</h4>
                                <small onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</small>
                            </div>
                        </div>
                    )}
                </header>

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
