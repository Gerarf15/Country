const { Type } = require("../db")

const getTypes =async(req, res)=>{
    const typesDb = await Type.findAll()
    return res.json(typesDb)
}

const postTypesActivity = async (req, res)=>{
    const {nameType} = req.body
    try {
        if(!nameType) return res.status(400).json({message: "the name type is requered"})
    const typeRegister = await Type.create({
        name: nameType
    })
    if(typeRegister) return res.status(201).json({message: "type register"})
    else{
        return res.json({message: "Oops, type no register"})
    }
    } catch (error) {
        return res.json({error})   
    }
}

module.exports ={
    getTypes,
    postTypesActivity
}