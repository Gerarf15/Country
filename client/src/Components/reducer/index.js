import {SET_COUNTRIES} from '../action/index'

const initialState={
    countries: []
}

const rootReducer =(state= initialState, action)=>{
    switch (action.type) {
        case SET_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }
    
        default:
            return state
    }
}

export default rootReducer
