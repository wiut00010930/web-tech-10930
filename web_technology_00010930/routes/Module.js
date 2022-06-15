const express = require("express");
const { async } = require("validate.js");
const router = express.Router();

var validate = require("validate.js");
const { Op } = require("sequelize");

let db = require('../database')
let moduleDatabase = db.moduleDatabase
let dbManager = require("../models")
moduleDatabase.sync().then(() => console.log("[ DB CONNECTED SUCCESSFULLY ]"))

router.get("/:id", async (req, res) => {
    try{

        let moduleID = req.params.id
        let module = await dbManager.Modules.findOne({
            where: { id: moduleID },
        });
        console.log(module.title)
        let modules = await dbManager.Modules.findAll()
        res.render('module_view.pug', {modulee: module, modules: modules})
    }catch{
        console.log('NOT FOUND')
    }
})



module.exports = router;