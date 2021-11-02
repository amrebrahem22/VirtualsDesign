import {userActions} from '../actions/userActions';

const initailState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
}

const userReducer = (state=initailState, action) => {
    switch (action.type) {
        case userActions.AUTH_START:
            return { ...state, loading: true }
            
        case userActions.AUTH_SUCESS:
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token }
            
        case userActions.AUTH_FAIL:
            return { ...state, loading: false, user: null, error: action.payload, token: null }
        
        case userActions.AUTH_LOGOUT:
            return { ...state, loading: false, user: null, error: null, token: null }
    
        default:
            return state
    }
}

export default userReducer