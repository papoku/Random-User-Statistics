/* Reducer file here */

import { combineReducers } from 'redux';
import { UPDATE_USER_LIST, FETCH_USERS, LOAD_STATS, SAVE_STATS } from '../actions/types';

const INITIAL_STATE = { data: [], stats: [], row: '', rowId: '' };

function fetchUsers(state = INITIAL_STATE, action) {
    let oldData = { ...state };

    switch (action.type) {
        case FETCH_USERS:
            let newData = oldData.data.filter((user) => user.length);
            newData.push(action.payload);
            return { ...state, data: newData };
        case LOAD_STATS:
            return { ...state, stats: action.payload };
        case SAVE_STATS:
            newData = oldData.data.filter((user, index) => index !== action.payload.rowId);
            return { ...state, data: newData, row: action.payload.stats, rowId: action.payload.rowId }
        default:
    }
    return state;
}

function updateUserList(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_USER_LIST:
            return { ...state, data: action.payload };
        //break;
        default:
    }
    return state;
}

// combine all your reducer if multiple created
const rootReducer = combineReducers({
    users: fetchUsers,
    updatedUserList: updateUserList
});

export default rootReducer;