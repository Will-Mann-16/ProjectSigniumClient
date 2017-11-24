export default function reducer(state={
    callovers: [],
    fetching: false,
    fetched: false,
    error: null
}, action){
    switch(action.type){
        case "CREATE_CALLOVER":
            return {...state, fetching: true, fetched: false};
        case "CREATE_CALLOVER_REJECTED":
            return {...state, fetching: false, error: action.payload};
        case "CREATE_CALLOVER_FULFILLED":
            return {...state, fetching: false, fetched: true};

        case "READ_CALLOVER":
            return {...state, fetching: true, fetched: false};
        case "READ_CALLOVER_REJECTED":
            return {...state, fetching: false, error: action.payload};
        case "READ_CALLOVER_FULFILLED":
            return {...state, fetching: false, fetched: true, callovers: action.payload};
        default:
            return state;
    }
}
