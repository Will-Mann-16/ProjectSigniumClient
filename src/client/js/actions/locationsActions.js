/*jshint esversion: 6 */
import axios from "axios";
import { emit, scriptsDirectory } from "./../socket.js";

export function createLocation(location){
  return dispatch => {
    dispatch({type: "CREATE_LOCATION"});
    axios.post(scriptsDirectory + "locations/create", {params: { location: location }}).then((response) =>{
      if(response.data.success){
        dispatch(readLocations(location._house));
        emit("socket-client-server-redraw-major");
        dispatch({type: "CREATE_LOCATION_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "CREATE_LOCATION_REJECTED", payload: response.data.reason});
      }
    }).catch((err) => {
      dispatch({type: "CREATE_LOCATION_REJECTED", payload: err});
    });
  };
}
export function readLocations(house){
  return dispatch => {
    dispatch({type: "READ_LOCATIONS"});
    axios.get(scriptsDirectory + "locations/read", {params: { house: house }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "READ_LOCATIONS_FULFILLED", payload: response.data.locations});
      }
      else{
        dispatch({type: "READ_LOCATIONS_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "READ_LOCATIONS_REJECTED", payload: err});
    });
  };
}


export function updateLocation(id, location){
  return dispatch => {
    dispatch({type: "UPDATE_LOCATION"});
    axios.post(scriptsDirectory + "locations/update",  {params: { id: id, location: location }}).then((response) =>{
      if(response.data.success){
          dispatch(readLocations(location._house));
          emit("socket-client-server-redraw-major");
        dispatch({type: "UPDATE_LOCATION_FULFILLED", payload: response.data.location});
      }
      else{
        dispatch({type: "UPDATE_LOCATION_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "UPDATE_LOCATION_REJECTED", payload: err});
    });
  };
}

export function deleteLocation(id){
  return dispatch => {
    dispatch({type: "DELETE_LOCATION"});
    axios.get(scriptsDirectory + "locations/delete",  {params: { id: id }}).then((response) =>{
      if(response.data.success){
          emit("socket-client-server-redraw-major");
        dispatch({type: "DELETE_LOCATION_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "DELETE_LOCATION_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "DELETE_LOCATION_REJECTED", payload: err});
    });
  };
}
