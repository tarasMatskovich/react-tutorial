import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        let authPayload = {
            email,
            password,
            returnSecureToken: true
        };
        try {
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbOSraUgyPHG1sZB3B3Hms23FXUP0co2c';
            if (!isLogin) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbOSraUgyPHG1sZB3B3Hms23FXUP0co2c';
            }
            let response = await axios.post(url, authPayload);
            let data = response.data;
            let expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn))

        } catch (e) {
            console.log(e);
        }
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, time * 1000);
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
