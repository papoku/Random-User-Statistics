import axios from "axios";
import { REMOTE_API_URL, LOCAL_API_URL } from "../helpers/helpers";
import { FETCH_USERS, LOAD_STATS, SAVE_STATS } from "../actions/types";


// fetch action to load data from API
export const fetchUserList = () => {
  return function (dispatch) {
    axios
      .get(`${REMOTE_API_URL}/?results=500`)
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data.results
        });
      })
      .catch(error => {
        console.log("Error while sending action", error);
      });
  };
};

// Load stats from localstorage API
export const loadUserList = () => {
  return function (dispatch) {
    axios
      .get(`${LOCAL_API_URL}/stats`)
      .then(response => {
        dispatch({
          type: LOAD_STATS,
          payload: response.data
        });
      })
      .catch(error => {
        console.log("Error while sending action", error);
      });
  };
};

// Save calculated stats in localstorage API
export const saveStats = (stats, rowId) => {
  return function (dispatch) {
    axios
      .post(`${LOCAL_API_URL}/stats`, { ...stats }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        dispatch({
          type: SAVE_STATS,
          payload: { stats, rowId }
        });
      })
      .catch(error => {
        console.log("Error while sending action", error);
      });
  };
};

