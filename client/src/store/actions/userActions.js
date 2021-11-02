import axios from 'axios';
import { loginUser } from '../../helpers/API_Routes'

export const userActions = {
    AUTH_START: 'AUTH_START',
    AUTH_SUCESS: 'AUTH_SUCESS',
    AUTH_FAIL: 'AUTH_SFAIL',
    AUTH_LOGOUT: 'AUTH_LOGOUT'
}

const authStart = () => {
    return {
        type: userActions.AUTH_START
    }
}

const authSuccess = (user, token) => {
    return {
        type: userActions.AUTH_SUCESS,
        payload: {user, token},
    }
}

const authFail = (err) => {
    return {
        type: userActions.AUTH_FAIL,
        payload: err
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        axios.post(loginUser, {email, password}).then(res => {
            const { user, token } = res.data;
            dispatch(authSuccess(user, token));

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        }).catch(err => {
            dispatch(authFail(err));
        })
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
      type: userActions.AUTH_LOGOUT,
    };
  };