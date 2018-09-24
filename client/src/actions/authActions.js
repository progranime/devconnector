import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// Register User
export const registerUser = (userData, history) => dispatch => {
    // asynchronous request
    // we need the thunk middleware
    axios
        .post('/api/users/register', userData)
        .then(res => {
            // console.log(res.data)
            history.push('/login')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Login - Get user token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            console.log(res)
            const { token } = res.data
            // Set token to localStorage
            localStorage.setItem('jwtToken', token)
            // Set to Auth Header
            setAuthToken(token)
            // Need a dependencies called jwt-decode to extract the data from the token
            // Decode token to get the user data
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future request
    setAuthToken(false)
    // Set the current user to empty object which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}
