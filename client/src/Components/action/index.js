export const SET_COUNTRIES="SET_COUNTRIES"
export const SET_SEARCH="SET_SEARCH"
export const RESET_SEARCH="RESET_SEARCH"
export const SET_CONTINENTS="SET_CONTINENTS"
export const FILTER_COUNTRY="FILTER_COUNTRY"
export const SET_TYPES="SET_TYPES"
export const ORDER_BY_NAME="ORDER_BY_NAME"

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
            payload: data.fromDb.results
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
        // console.log(data)

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

