const express = require("express");
const { async } = require("validate.js");
const router = express.Router();

var validate = require("validate.js");
const { Op } = require("sequelize");

let db = require('../database')
let moduleDatabase = db.moduleDatabase
let dbManager = require("../models")
moduleDatabase.sync().then(() => console.log("[ DB CONNECTED SUCCESSFULLY ]"))


router.get("/list", async (req, res) => {
    try{
        let module = await dbManager.Modules.findAll({
            where: { inCart: true},
        });
        res.render('cart_view.pug', {modulee: module})
    }catch{
        console.log('NOT FOUND')
    }
})

router.post("/add/:id/", async (req, res) => {
    try{
        console.log('i worked')
        let moduleID = req.params.id
        await dbManager.Modules.update(
            { inCart: true},
            { where: { id: moduleID } }
        );
        res.json('success')
    }catch{
        res.json('fail')
    }
})

router.post("/remove/:id/", async (req, res) => {
    try{
        console.log('i worked')
        let moduleID = req.body.id
        await dbManager.Modules.update(
            { inCart: false},
            { where: { id: moduleID } }
        );
        res.json('success')
    }catch{
        res.json('fail')
    }
})


module.exports = router;