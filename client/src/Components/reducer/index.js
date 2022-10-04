import {
    SET_COUNTRIES,
    SET_SEARCH,
    RESET_SEARCH,
    FILTER_COUNTRY,
    SET_TYPES,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_DETAIL,
    FILTER_ACTIVITY,
    SET_PAGE_BACK,
    RESET_DETAIL,
    FILTER_AREA
} from '../action/actionTypes.js'

const initialState={
    countries: [],
    filtered_countries: [],
    types: [],
    detail:null,
    searching: false,
    pageBack: 0
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
                searching: true,
                pageBack: 0
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
                searching: true,
                pageBack: 0
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
        
        case FILTER_ACTIVITY:
            return{
                ...state,
                filtered_countries: action.payload,
                searching: true,
                pageBack: 0
            }
        case SET_PAGE_BACK:
            return{
                ...state,
                pageBack: action.payload,
            }
        case RESET_DETAIL:
            return{
                ...state,
                detail: null,
            }
        case FILTER_AREA:
            return{
                ...state,
                countries: action.payload,
            }
        default:
            return state
    }
}

export default rootReducer
