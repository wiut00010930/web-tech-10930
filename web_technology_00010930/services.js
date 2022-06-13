const { async } = require("validate.js");
var validate = require("validate.js");

let db = require('./database') // DATABASE
let moduleDatabase = db.moduleDatabase
let dbManager = require("./models")
moduleDatabase.sync().then(() => console.log("[ DB CONNECTED SUCCESSFULLY ]"))
let service = require('./services')

async function add(title, description, price, inCart, startDate) {
    var constraints = {
        moduleTitle: {
            presence: {allowEmpty: false},
            length: {
                minimum: 5,
                message: "must be at least 5 characters"
            }
        },
    }
    let isValid = validate({
        moduleTitle: title
    }, constraints);

    if (isValid == undefined){
        let isAvailable = await (await dbManager.Modules.findAndCountAll({where: {title: title}})).count
        if (isAvailable == 0) {
            let d = new Date();
            await dbManager.Modules.create({
                title: title,
                description: description,
                full: false,
                price: price,
                inCart: false,
                startDate: startDate
            })
            return true
        }else{
            return false
        }    
    }
}


async function update(id, title, description, price, startDate, status) {
    let findThis = dbManager.Modules.findOne({ where: { id: id } })
    console.log(status + '  /dddd')
    if (status == undefined) {
        console.log('i worked')
        await dbManager.Modules.update(
            { title: title, description: description, price: price, full: 0, startDate: startDate},
            { where: { id: id } }
        );
    }else{
        console.log('777777')
        await dbManager.Modules.update(
            { title: title, description: description, price: price, full: 1, startDate: startDate},
            { where: { id: id } }
        );
    }
}



module.exports = {add,update}

