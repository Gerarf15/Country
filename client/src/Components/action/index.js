
import {
    SET_COUNTRIES,
    SET_SEARCH,
    RESET_SEARCH,
    // SET_CONTINENTS,
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

export const getCountriesBack = () =>{
    return async function(dispatch){
        const response = await fetch(`https://country-app-project1.onrender.com/countries`)
        console.log(response)
        const data = await response.json()
        if(data){
            return dispatch({
                type: SET_COUNTRIES,
                payload: data
            })
        }
    }
    /* return function(dispatch){
    fetch(`https://country-app-8oiu.onrender.com/countries`)
        .then(response => response.json())
        .then(data => dispatch({
            type: SET_COUNTRIES,
            payload: data
        }))
        .catch(err => console.log(err))
    } */
}

//busqueda
export const getSearchName =(name)=>{
    /* return async function(dispatch){
        const response = await fetch(`https://country-app-8oiu.onrender.com/countries?name=${name}`)
        const data = await response.json()
        return dispatch({
            type: SET_SEARCH,
            payload: data.fromDb.results ? data.fromDb.results : []
        })
    } */
    return function(dispatch){
        fetch(`https://country-app-project1.onrender.com/countries?name=${name}`)
        .then(response => response.json())
        .then(data => dispatch({
            type: SET_SEARCH,
            payload: data.fromDb.results ? data.fromDb.results : [] 
        }))
        .catch(err => console.log(err))
    }
}

//reset de paises
export const resetSearch =()=>{
    return{
        type: RESET_SEARCH,
        payload: []
    }
}

//filtar continents
export const filterContinents =(countries, continent)=>{
    const filterresult = countries.filter(country =>
        country.continents.toLowerCase() === continent
    )
    return {
        type: FILTER_COUNTRY,
        payload: filterresult
    }
}

//types
export const getTypes =()=>{
    return async function(dispatch){
        const response = await fetch(`https://country-app-project1.onrender.com/types`)
        const data = await response.json()

        return dispatch({
            type: SET_TYPES,
            payload: data
        })
    }
}

//orden asc-desc
const orderFunction=(ordenParam, country)=>{
    let results
    if(ordenParam > 0){
        results= country.sort((a,b)=>{
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            return 0
        })
    }else{
        results= country.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
            return 0
        })
    }
    return results
}

export const orderByName=(ordenParam, country)=>{
    const results = orderFunction(ordenParam, country)
    return{
        type:ORDER_BY_NAME,
        payload:results
    }
}

//orden por population
const orderPobFunction=(ordenPobParam, countries)=>{
    let results
    if(ordenPobParam > 0){
        results= countries.sort((a,b)=>{
            if(a.population > b.population) return 1
            if(a.population < b.population) return -1
            return 0
        })
    }else{
        results= countries.sort((a,b)=>{
            if(a.population < b.population) return 1
            if(a.population > b.population) return -1
            return 0
        })
    }
    return results
}

export const orderByPopulation=(ordenPobParam, countries)=>{
    const results = orderPobFunction(ordenPobParam, countries)
    return{
        type:ORDER_BY_POPULATION,
        payload:results
    }
}

//detail
export const getDetail =  (idPais) =>{ 
    return async function (dispatch){
        const response = await fetch(`https://country-app-project1.onrender.com/countrie/${idPais}`)
        const data = await response.json()
        if(data){
            return dispatch({
                type: GET_DETAIL,
                payload: data
            })
        }
    }
}

//filter activity
const countryFilter = (activityParam, countries)=>{
    const resultts = countries.filter((coun)=> {
        let isHere = false
        coun.activities.forEach(act=> {
            
            if(act.name === activityParam) isHere= true;    
        })
    if(isHere) return coun
    })
    return resultts
}

export const filterByActivity = (activityParam, countries)=>{
    const filterResults = countryFilter(activityParam, countries)
    return{
        type: FILTER_ACTIVITY,
        payload: filterResults,
    }
}

//volver a la pagina
export const setPageBack=(page)=>{
    return{
        type: SET_PAGE_BACK,
        payload: page
    }
}

//desmontar el detail
export const resetDetail =()=>{
    return{
        type: RESET_DETAIL
    }
}

export const filterArea = (countries)=>{
    return function(dispatch){
        const filterAre = countries.filter(a => a.area > 5000000)
        return dispatch({
            type: FILTER_AREA,
            payload: filterAre
        })
    }

}

