const {Country, Activity} = require("../db")
const {getCountriesApi} = require("../servies/api.services")
const { Op } = require("sequelize")


//todos
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
    // console.log(name)
    try {
        // console.log(name)
        const coountryByName = await Country.findAll({
            include: Activity,
            where:{
                name:{
                    [Op.iLike] : `%${name}%`
                } 
            }
        })
        // console.log(coountryByName)
        if(coountryByName.length > 0){
            return{status:200, results: coountryByName}
        }else{
            return{status:404,message:"Request not found...!!!"}
        }
    } catch (error) {
      return{status:500,error}

    }
}
//mando un chico q me ayudo
/* router.get("/", async (req, res) => {
    const name = req.query.name; //name from query(url)
  
    try {
      if (name) {
        const nameCountry = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
        nameCountry.length
          ? res.status(200).json(nameCountry)
          : res.status(404).send("Countrie not found");
      } else {
        const countries = await Country.findAll({
          attributes: ["id", "flags", "name",
   "continent"],
        });
  
        res.status(200).json(countries);
      }
    } catch (err) {
      console.log(err);
    }
  }); */

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
