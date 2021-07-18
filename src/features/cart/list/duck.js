/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const SAMPLE = 'SAMPLE';


export default (state = {

}, action) => {
    switch(action.type) {
        case SAMPLE: 
            return state = {
                ...state
            }
        default:
            return state;
    }
}