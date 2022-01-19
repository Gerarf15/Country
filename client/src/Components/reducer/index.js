import {
    SET_COUNTRIES,
    SET_SEARCH,
    RESET_SEARCH,
    FILTER_COUNTRY,
    SET_TYPES,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_DETAIL,
    RESET_DETAIL,
    FILTER_ACTIVITY
} from '../action/index'

const initialState={
    countries: [],
    filtered_countries: [],
    types: [],
    detail:null,
    searching: false

}

const rootReducer =(state= initialState, action)=>{
    switch (action.type) {
        case SET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                searching: false

            }
        case SET_SEARCH:
            return{
                ...state,
                filtered_countries: action.payload,
                searching: true
            }
        case RESET_SEARCH:
            return{
                ...state,
                filtered_countries: action.payload,
                searching: false
            }
        case FILTER_COUNTRY:
            return{
                ...state,
                filtered_countries: action.payload,
                searching: true
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
        case ORDER_BY_POPULATION:
            return{
                ...state,
                filtered_countries: action.payload,
            } 
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload,
            }
        case RESET_DETAIL:
            return{
                ...state,
                detail: null,
            }
        case FILTER_ACTIVITY:
            return{
                ...state,
                filtered_countries: action.payload,
                searching: true
                
            }
        default:
            return state
    }
}

export default rootReducer
