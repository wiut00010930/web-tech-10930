const { text } = require('express');
let express = require('express')
let app = express()
const path = require("path")
var bodyParser = require('body-parser')
const Module = require("./routes/Module");
const Cart = require("./routes/Cart");
const API = require("./routes/API");
const Search = require("./routes/Search");

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/module", Module);
app.use("/cart", Cart);
app.use("/search", Search);

app.use("/api", API);

app.set("view-engine", "pug");

let db = require('./database')
let moduleDatabase = db.moduleDatabase
let dbManager = require("./models")
moduleDatabase.sync().then(() => console.log("[ DB CONNECTED SUCCESSFULLY ]"))
let service = require('./services')


app.get('/', async (req, res) => {
    let modules = await dbManager.Modules.findAll()
    res.render('index.pug', {modules:modules})
})

app.post('/add/module/', async (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let startDate = req.body.startdate
    let price = req.body.price
    let inCart = false

    let add_module = service.add(title, description, price, inCart, startDate)
    res.redirect('/')
})


app.post('/update/module/:id/', async (req, res) => {
    let moduleId = req.params.id
    let title = req.body.title
    let description = req.body.description
    let startDate = req.body.startdate
    let price = req.body.price
    let status = req.body.status
    let add_module = service.update(moduleId, title, description, price, startDate, status)
    res.redirect('/my/modules/')
})

app.post('/delete/module/:id/', async (req, res) => {
    await dbManager.Modules.destroy({
        where: {
          id: req.params.id
        }
    });
    res.redirect('/my/modules/')
})

app.get('/my/modules/', async (req, res) => {
    let modules = await dbManager.Modules.findAll()
    res.render('my_modules.pug', {modules:modules})
})


app.listen(8000 || process.env.PORT)