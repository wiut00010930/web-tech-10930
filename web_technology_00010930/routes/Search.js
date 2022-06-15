const express = require("express");
const { async } = require("validate.js");
const router = express.Router();

var validate = require("validate.js");
const { Op } = require("sequelize");

let db = require('../database')
let moduleDatabase = db.moduleDatabase
let dbManager = require("../models")
moduleDatabase.sync().then(() => console.log("[ DB CONNECTED SUCCESSFULLY ]"))

router.get("/", async (req, res) => {
    try{
        let date = new Date()
        let timeStarted = date.getTime()
        console.log(timeStarted)
        let searchQuery = req.query.q
        
        let result = await dbManager.Modules.findAll({
            where: { 
                [Op.or] :{
                    title: {
                        [Op.like]: '%'+  searchQuery + '%'
                    },
                    description: {
                        [Op.like]: '%'+  searchQuery + '%'
                    },
                    price: {
                        [Op.like]: '%'+  searchQuery + '%'
                    },
                   
                },
            },
        })

        let enddate = new Date()
        let timeEnded = enddate.getTime()
        let timeSpent = (timeEnded - timeStarted) / 1000
        res.render('search_result_view.pug', {modules:result, query:searchQuery, timeSpent: timeSpent})
    }catch {
        let searchQuery = req.query.q
        res.render('search_result_view.pug', {result: false, query: searchQuery})
    }
})


module.exports = router;


