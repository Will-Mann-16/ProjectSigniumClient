import axios from "axios"
import { scriptsDirectory } from "../socket";

export function createCallover(callover){
    return dispatch => {
        dispatch({type: "CREATE_CALLOVER"});
        axios.post(scriptsDirectory + "callover/create", {params: { callover: callover }}).then((response) =>{
            if(response.data.success){
                dispatch(readCallovers(callover._house));
                dispatch({type: "CREATE_CALLOVER_FULFILLED", payload: response.data.success});
            }
            else{
                dispatch({type: "CREATE_CALLOVER_REJECTED", payload: response.data.reason});
            }
        }).catch((err) => {
            dispatch({type: "CREATE_CALLOVER_REJECTED", payload: err});
        });
    };
}

export function readCallovers(house){
    return dispatch => {
        dispatch({type: "READ_CALLOVER"});
        axios.get(scriptsDirectory + "callover/read", {params: {house: house}}).then((response) =>{
            if(response.data.success){
                dispatch({type: "READ_CALLOVER_FULFILLED", payload: response.data.callovers});
            }
            else{
                dispatch({type: "READ_CALLOVER_REJECTED", payload: response.data.reason});
            }
        }).catch((err) =>{
            dispatch({type: "READ_CALLOVER_REJECTED", payload: err});
        });
    };
}
