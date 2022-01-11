const {
    getCountriesApi, 
    getCountryByIdApi,
    getCountriesFromApi
} = require("../servies/api.services")

const {
    getCountriesDb,
    getCountryNameDb,
    getIdFronDb
} = require("../helpers/country.helpers")

//todos los paises y busqueda por name
const getCountries = async (req,res) => {
    const {name} = req.query
    if(name){
        //buscar en api y bd por name
        const coutryByName = await getCountryNameDb(name)
        return res.json(coutryByName)
    }else{{
        const dataFromApi = await getCountriesDb()
        return res.json(dataFromApi)

    }}
}

//busqueda por ID
const getCountriesId = async (req, res)=>{
    const {idPais} = req.params
    console.log(idPais)
    if(!idPais){
        return res.json({status: 400, message: "id is requered"})
    }
    const dataById = await getIdFronDb(idPais)
    return res.json(dataById) 
}



module.exports={
    getCountries,
    getCountriesId
}
