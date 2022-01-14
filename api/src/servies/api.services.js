require("dotenv").config()
const {ALL_COUNTRIES, BY_NAME, BY_ID} = process.env
const axios = require("axios")

//busqueda por name
/* const getCountryByIdApi = async (name) =>{
    console.log(name)
    const response = await axios(`${BY_NAME}${name}`)
    if(response){
        return response.data
    }else{
        return {status: 404, message: "Country not found"}
    }

} */

//todos los country
const getCountriesApi= async ()=> {
    const response = await axios(`${ALL_COUNTRIES}`)
    console.log(response)
    
    if(response){
        const countryCollection = await response.data.map((country)=>{
            const objeto ={
                id: country.cca3,
                name: country.name.common,
                image: country.flags[0],
                continents: country.continents[0],
                capital: country.capital ? country.capital[0] : null,
                subregion: country.subregion ? country.subregion : null,
                area: country.area,
                population: country.population
            }
            return objeto
        })
        return countryCollection
    }
    return {messaje: "Oops faild"}
}



module.exports={
    getCountriesApi,
}