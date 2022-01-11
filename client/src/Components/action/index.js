export const SET_COUNTRIES="SET_COUNTRIES"

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
