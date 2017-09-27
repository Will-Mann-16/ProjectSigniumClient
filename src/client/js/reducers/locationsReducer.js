export default function reducer(state={
  locations: [],
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch(action.type){
    case "CREATE_LOCATION":
      return {...state, fetching: true, fetched: false};
    case "CREATE_LOCATION_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "CREATE_LOCATION_FULFILLED":
      return {...state, fetching: false, fetched: true};

    case "READ_LOCATIONS":
      return {...state, fetching: true, fetched: false};
    case "READ_LOCATIONS_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "READ_LOCATIONS_FULFILLED":
      return {...state, fetching: false, fetched: true, locations: action.payload};

    case "UPDATE_LOCATION":
      return {...state, fetching: true, fetched: false};
    case "UPDATE_LOCATION_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "UPDATE_LOCATION_FULFILLED":
      return {...state, fetching: false, fetched: true};

    case "DELETE_LOCATION":
      return {...state, fetching: true, fetched: false};
    case "DELETE_LOCATION_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "DELETE_LOCATION_FULFILLED":
      return {...state, fetching: false, fetched: true};

    default:
      return state;
  }
}
