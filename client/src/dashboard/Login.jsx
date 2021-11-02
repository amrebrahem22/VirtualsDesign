import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authLogin } from '../store/actions/userActions';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        if(user.token) history.push("/dashboard")
    }, [user.token, history])

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(authLogin(email, password));

    }

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={handleSubmit} className="form-login">
                    <div>
                        <div className="input">
                            <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email or Phone Number"/>
                        </div>
                        <div className="input">
                            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="login-button">
                        <button type="submit" className="button"><b>Log In</b></button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
