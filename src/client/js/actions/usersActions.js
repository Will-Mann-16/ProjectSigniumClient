/*jshint esversion: 6 */
import axios from "axios";
import { scriptsDirectory } from "./../socket.js";
import { push } from "react-router-redux";


export function createUser(user){
  return dispatch => {
    dispatch({type: "CREATE_USER"});
    axios.post(scriptsDirectory + "users/create", {params: { user: user }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "CREATE_USER_FULFILLED", payload: true});
      }
      else{
        dispatch({type: "CREATE_USER_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "CREATE_USER_REJECTED", payload: err});
    });
  };
}
export function readUser(){
  return dispatch => {
    dispatch({type: "READ_USER"});
    axios.post(scriptsDirectory + "users/read", {params: { jwt: localStorage.getItem("AUTH-TOKEN") ? localStorage.getItem("AUTH-TOKEN") : false }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "READ_USER_FULFILLED", payload: response.data.user});
      }
      else if(response.data.empty){
        dispatch({type: "READ_USER_EMPTY", payload: false});
      }
      else{
        dispatch({type: "READ_USER_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "READ_USER_REJECTED", payload: err});
    });
  };
}
export function updateUser(id, user){
  return dispatch => {
    dispatch({type: "UPDATE_USER"});
    axios.post(scriptsDirectory + "users/update", {params: { id: id, user: user }}).then((response) =>{
      if(response.data.success){
        localStorage.setItem("AUTH-TOKEN", response.data.token);
        dispatch({type: "UPDATE_USER_FULFILLED", payload: true});
      }
      else{
        dispatch({type: "UPDATE_USER_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "UPDATE_USER_REJECTED", payload: err});
    });
  };
}

export function deleteUser(id){
  return dispatch => {
    dispatch({type: "DELETE_USER"});
    axios.get(scriptsDirectory + "users/delete",  {params: { id: id}}).then((response) =>{
      if(response.data.success){
        dispatch({type: "DELETE_USER_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "DELETE_USER_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "DELETE_USER_REJECTED", payload: err});
    });
  };
}

export function authenticateUser(username, password){
  return dispatch => {
    dispatch({type: "AUTHENTICATE_USER"});
    axios.post(scriptsDirectory + "users/authenticate", {params: {username: username, password: password}}).then((response) =>{
      if(response.data.success){
        if(!response.data.authenticated){
          dispatch({type: "AUTHENTICATE_USER_DENIED", payload: false});
        }
        else{
          localStorage.setItem("AUTH-TOKEN", response.data.token);
          dispatch({type: "AUTHENTICATE_USER_FULFILLED", payload: true});
          dispatch(readUser());
        }
      }
      else{
        dispatch({type: "AUTHENTICATE_USER_REJECTED", payload: response.data.reason});
      }

    }).catch((err) =>{
      dispatch({type: "AUTHENTICATE_USER_REJECTED", payload: err});
    });
  };
}

export function logoutUser(){
  return dispatch => {
    dispatch({type: "LOGOUT_USER"});
    localStorage.removeItem("AUTH-TOKEN");
    dispatch({type: "LOGOUT_USER_FULFILLED", payload: true});
    dispatch(push("/"));
    dispatch(readUser());
      //dispatch({type: "LOGOUT_USER_REJECTED", payload: err});
  };
}
