export default function reducer(state={
  houses: [],
  fetching: false,
  fetched: false,
  error: null
}, action){
  console.log(action);
  switch(action.type){
    case "CREATE_HOUSE":
      return {...state, fetching: true, fetched: false};
    case "CREATE_HOUSE_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "CREATE_HOUSE_FULFILLED":
      return {...state, fetching: false, fetched: true};

    case "READ_HOUSES":
      return {...state, fetching: true, fetched: false};
    case "READ_HOUSES_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "READ_HOUSES_FULFILLED":
      return {...state, fetching: false, fetched: true, houses: action.payload};

    case "UPDATE_HOUSE":
      return {...state, fetching: true, fetched: false};
    case "UPDATE_HOUSE_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "UPDATE_HOUSE_FULFILLED":
      return {...state, fetching: false, fetched: true};

    case "DELETE_HOUSE":
      return {...state, fetching: true, fetched: false};
    case "DELETE_HOUSE_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "DELETE_HOUSE_FULFILLED":
      return {...state, fetching: false, fetched: true};

    default:
      return state;
  }
}
