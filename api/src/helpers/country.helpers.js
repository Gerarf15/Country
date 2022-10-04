const {Country, Activity} = require("../db")
const {getCountriesApi} = require("../servies/api.services")
const { Op } = require("sequelize")


//guardo los paises en BD
const getCountriesDb =async ()=>{
    try {
        const size_CountryDb = await Country.count()
        if(size_CountryDb === 0){
            const countryApi = await getCountriesApi()
            await Country.bulkCreate(countryApi)
        }
        const country = await Country.findAll({
          include: Activity
        })
        return country
    } catch (error) {
      return{status:500,error}

    }
}

//busqueda por name
const getCountryNameDb = async (name) =>{
    try {
        const coountryByName = await Country.findAll({
            include: Activity,
            where:{
                name:{
                    [Op.iLike] : `%${name}%`
                } 
            }
        })
        if(coountryByName.length > 0){
            return{status:200, results: coountryByName}
        }else{
            return{status:404,message:"Request not found...!!!"}
        }
    } catch (error) {
      return{status:500,error}

    }
}


//busqueda por id
const getIdFronDb = ( async (req, res) => {
    const { idPais } = req.params; //req from params
    try {
      const countryId = await Country.findByPk(idPais.toUpperCase(), {
        include: {
          model: Activity,
        },
      });
      countryId
        ? res.status(200).json(countryId)
        : res.status(404).send(`"Id not found in database`);
    } catch (err) {
      return{status:500, error} 

    }
  });




module.exports = {
    getCountriesDb,
    getCountryNameDb,
    getIdFronDb
}

/* const {Country} =require("../db")

const insertCountries=async(countryObj, countries)=>{
    const countryRegister = await Country.create(countryObj)

    if(countryRegister){
    }

}

module.export ={
    insertCountries
} */
