import * as studentsActions from './actions/studentsActions';
import * as locationsActions from './actions/locationsActions';
import * as usersActions from './actions/usersActions';
import io from "socket.io-client";

//const HOST_IP = "http://ridge-server.azurewebsites.net:8080";
const HOST_IP = "http://localhost:8081";
//const HOST_IP = "http://10.11.0.23:8081";
export const scriptsDirectory = HOST_IP + "/api/";

var socket;
export var connected = false;

export function activateListener(dispatch, house) {
  if (!connected) {
    socket = io.connect(HOST_IP);
    socket.on('connect', () => {
      connected = true;
      socket.emit('socket-client-server-init', {
        house: house
      });
      socket.on('socket-server-client-init', function () {
        socket.on('socket-server-client-redraw-minor', response => {
          if (house === response.house) {
            dispatch(studentsActions.readStudentsMinor(house));
          }
        });
        socket.on('socket-server-client-redraw-major', response => {
          if (house === response.house) {
            dispatch(studentsActions.readStudentsMajor(house));
            dispatch(locationsActions.readLocations(house));
          }
        });
      });
    });
  }
}

export function emit(value, packet = {}) {
  if (connected) {
    socket.emit(value, packet);
  }
}

export function disconnect(){
  if(connected){
    socket.disconnect();
  }
}