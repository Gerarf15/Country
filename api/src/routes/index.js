const { Router } = require('express');
const {
    getCountries, 
    getCountriesId,
} = require("../controllers/countries.controllers")

const {postCountry} = require("../controllers/activity.controllers")

const { getIdFronDb } = require("../helpers/country.helpers")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.route("/countries").get(getCountries) 
router.route("/countrie/:idPais").get(getIdFronDb) 
router.route("/activity").post(postCountry) 


module.exports = router;
