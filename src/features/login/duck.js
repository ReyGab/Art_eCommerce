/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import constantsHelper from '../../util/constants/constants';


const LOGIN_ADMIN_SUCCESS = 'LOGIN_ADMIN_SUCCESS';
const LOGIN_ADMIN_ERROR = 'LOGIN_ADMIN_ERROR';



export default (state = {
    adminInfo: null
},action) => {
    switch(action.type) {
        case LOGIN_ADMIN_SUCCESS:
            return state = {
                ...state,
                adminInfo: action.payload
            }
        
        default:
            return state;
    }
}


const loginAdminSuccess = (adminInfo) => ({
    type: LOGIN_ADMIN_SUCCESS,
    payload: adminInfo
})

export const loginAdmin = (values) => (dispatch) => {
    axios.get(`${constantsHelper.baseUrl}users?password=${values.password}`).then(response => {
        if(response.data.length !== 0) {
            // auth.login()
            dispatch(loginAdminSuccess(response.data));
        } else {
            alert('wrong password')
        }
        
    })
}

export const authenticateUser = (adminId) => () => {
    axios.post()
}