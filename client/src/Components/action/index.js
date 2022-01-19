export const SET_COUNTRIES="SET_COUNTRIES"
export const SET_SEARCH="SET_SEARCH"
export const RESET_SEARCH="RESET_SEARCH"
export const SET_CONTINENTS="SET_CONTINENTS"
export const FILTER_COUNTRY="FILTER_COUNTRY"
export const SET_TYPES="SET_TYPES"
export const ORDER_BY_NAME="ORDER_BY_NAME"
export const ORDER_BY_POPULATION="ORDER_BY_POPULATION"
export const GET_DETAIL="GET_DETAIL"
export const RESET_DETAIL ="RESET_DETAIL"
export const FILTER_ACTIVITY ="FILTER_ACTIVITY"

export const getCountriesBack = () =>{
    return async function(dispatch){

        const response = await fetch(`http://Localhost:3001/countries`)
        const data = await response.json()
        if(data){
            return dispatch({
                type: SET_COUNTRIES,
                payload: data
            })
        }

    }
}

//busqueda
export const getSearchName =(name)=>{
    return async function(dispatch){
        const response = await fetch(`http://Localhost:3001/countries?name=${name}`)
        const data = await response.json()
        console.log(data)

        return dispatch({
            type: SET_SEARCH,
            payload: data.fromDb.results ? data.fromDb.results : []
        })
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
        const response = await fetch(`http://Localhost:3001/types`)
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

//orden por rating
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
        const response = await fetch(`http://localhost:3001/countrie/${idPais}`)
        const data = await response.json()
        if(data){
            return dispatch({
                type: GET_DETAIL,
                payload: data
            })
        }
    }
}

//reset detail
export const resetDetail=()=>{
    return{
        type: RESET_DETAIL
    }
}

//filter activity
const countryFilter = (activityParam, countries)=>{
    console.log(activityParam)
    const resultts = countries.filter((coun)=> {
        let isHere = false
        coun.activities.forEach(act=> {
            
            if(act.name === activityParam) isHere= true;    
        })
    if(isHere) return coun
    })
    console.log(resultts)
    return resultts
}

export const filterByActivity = (activityParam, countries)=>{
    const filterResults = countryFilter(activityParam, countries)
    return{
        type: FILTER_ACTIVITY,
        payload: filterResults,
    }
}

