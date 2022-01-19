const {Country, Activity} = require("../db")

const {insertActivity} = require("../helpers/activity.helpers")
const {v4} = require("uuid")


//creacion
/* const postCountry= async (req, res)=>{
    const {name, difficulty, duration, season, country  } = req.body

    console.log(name, difficulty, duration, season, country)
    if(!name || !difficulty || !duration || !season){
        return res.json({status: 400, message: "Bad request, some field requered"})
    }

    console.log(typeof country, "countryyyyy")
    if(country.length > 0){

        const countryObj ={
            id: v4(),
            name,
            difficulty,
            duration,
            season
        }

        const dataResult = await insertActivity(countryObj, country)
        return res.json(dataResult)
    }

} */

//mando un chico q me ayudo
const postCountry = ( async (req, res) => {
    const { name, difficulty, duration, season, countriesId } = req.body;

    // console.log(name, difficulty, duration, season, countriesId, "infoooooo")
  
    try {
      const [activity, created] = await Activity.findOrCreate({
        where: {
          name,
          difficulty,
          duration,
          season,
        },
      });
      // console.log(activity, "aaaaaaaaa")
      await activity.setCountries(countriesId);
  
      res.status(201).json({data:activity, message: "Activity Register"});
    } catch (err) {
      // console.log(err);
    }
  });

module.exports={
    postCountry
}