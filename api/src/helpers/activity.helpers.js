/* const { Country } = require("../db")

const insertActivity = async (countryObj, country) =>{
    
    console.log(country)
    try {
        const countryRegister = await Country.create(countryObj)
        if(countryRegister){
            //llenar los datos en la tercer tabla, funciones (setGenres..) del "orm"
            await countryRegister.setActivity(JSON.parse(country))
    
            return {status:201,message:"Register successfull", data: countryRegister}
    
        }else{
            return {status:204, message:"Oops, register falled "}
        }
        
    } catch (error) {
        return {status: 500, error}
    }

}

module.exports={
    insertActivity
} */