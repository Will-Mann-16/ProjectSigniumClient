/*jshint esversion: 6 */
import axios from "axios";
import { emit, scriptsDirectory } from "./../socket.js";

export function createHouse(house){
  return dispatch => {
    dispatch({type: "CREATE_HOUSE"});
    axios.post(scriptsDirectory + "houses/create", {params: { house: house }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "CREATE_HOUSE_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "CREATE_HOUSE_REJECTED", payload: response.data.reason});
      }
    }).catch((err) => {
      dispatch({type: "CREATE_HOUSE_REJECTED", payload: err});
    });
  };
}
export function readHouses(){
  return dispatch => {
    dispatch({type: "READ_HOUSES"});
    axios.get(scriptsDirectory + "houses/read").then((response) =>{
      if(response.data.success){
        dispatch({type: "READ_HOUSES_FULFILLED", payload: response.data.houses});
      }
      else{
        dispatch({type: "READ_HOUSES_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "READ_HOUSES_REJECTED", payload: err});
    });
  };
}


export function updateHouse(id, house){
  return dispatch => {
    dispatch({type: "UPDATE_HOUSE"});
    axios.post(scriptsDirectory + "houses/update",  {params: { id: id, house: house }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "UPDATE_HOUSE_FULFILLED", payload: response.data.house});
      }
      else{
        dispatch({type: "UPDATE_HOUSE_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "UPDATE_HOUSE_REJECTED", payload: err});
    });
  };
}

export function deleteHouse(id){
  return dispatch => {
    dispatch({type: "DELETE_HOUSE"});
    axios.get(scriptsDirectory + "houses/delete",  {params: { id: id }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "DELETE_HOUSE_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "DELETE_HOUSE_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "DELETE_HOUSE_REJECTED", payload: err});
    });
  };
}
