const { Type } = require("../db")

const getTypes =async(req, res)=>{
    const typesDb = await Type.findAll()
    return res.json(typesDb)
}

module.exports ={
    getTypes
}