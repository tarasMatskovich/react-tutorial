import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            };
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            };
        default:
            return state;
    }
}
