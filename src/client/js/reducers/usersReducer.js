export default function reducer(state={
  user: {},
  fetching: false,
  fetched: false,
  authenticated: false,
  error: null
}, action){
  switch(action.type){
    case "CREATE_USER":
      return {...state, fetching: true, fetched: false};
    case "CREATE_USER_REJECTED":
      return {...state, fetching: false, fetched: true, error: action.payload}
    case "CREATE_USER_FULFILLED":
      return {...state, fetching: false, fetched: true};

    case "READ_USER":
      return {...state, fetching: true, fetched: false};
    case "READ_USER_FULFILLED":
      return {...state, fetching: false, fetched: true, user: action.payload, authenticated: true};
    case "READ_USER_EMPTY":
      return {...state, fetching: false, fetched: true, user: {}, authenticated: false};
    case "READ_USER_REJECTED":
      return {...state, fetching: false, fetched: true, error: action.payload};

    case "UPDATE_USER":
      return {...state, fetching: true, fetched: false};
    case "UPDATE_USER_REJECTED":
      return {...state, fetching: false, fetched: true, error: action.payload};
    case "UPDATE_USER_FULFILLED":
      return {...state, fetching: false, fetched: true, user: action.payload};

    case "DELETE_USER":
      return {...state, fetching: true, fetched: false};
    case "DELETE_USER_REJECTED":
      return {...state, fetching: false, fetched: true, error: action.payload};
    case "DELETE_USER_FULFILLED":
      return {...state, fetching: false, fetched: true};

    case "AUTHENTICATE_USER":
      return {...state, fetching: true, fetched: false};
    case "AUTHENTICATE_USER_FULFILLED":
      return {...state, fetching: false, fetched: true};
    case "AUTHENTICATE_USER_DENIED":
      return {...state, fetching: false, fetched: true};
    case "AUTHENTICATE_USER_REJECTED":
      return {...state, fetching: false, error: action.payload};

    case "LOGOUT_USER":
      return {...state, fetching: true, fetched: false};
    case "LOGON_USER_FULFILLED":
      return {...state, fetching: false, user: {}, authenticated: false};
    case "LOGON_USER_REJECTED":
      return {...state, fetching: false, error: action.payload};
    default:
      return state;
  }
}
