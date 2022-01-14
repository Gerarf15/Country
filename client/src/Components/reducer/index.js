import {
    SET_COUNTRIES,
    SET_SEARCH,
    RESET_SEARCH,
    FILTER_COUNTRY,
    SET_TYPES,
    ORDER_BY_NAME
} from '../action/index'

const initialState={
    countries: [],
    filtered_countries: [],
    types: []
}

const rootReducer =(state= initialState, action)=>{
    switch (action.type) {
        case SET_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }
        case SET_SEARCH:
            return{
                ...state,
                filtered_countries: action.payload
            }
        case RESET_SEARCH:
            return{
                ...state,
                filtered_countries: action.payload
            }
        case FILTER_COUNTRY:
            return{
                ...state,
                filtered_countries: action.payload
            }    
        case SET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case ORDER_BY_NAME:
            return{
                ...state,
                filtered_countries: action.payload,
            }
        default:
            return state
    }
}

export default rootReducer
