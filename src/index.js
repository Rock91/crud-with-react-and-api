let express = require('express')
MongoClient = require('mongodb').MongoClient;

let customerRoute = require('../public/Routes/note_routes')
var cors = require('cors')
let path = require('path')

let bodyParser = require('body-parser')
let app = express();
let db =  require('../public/config/db')

app.use(cors({
    credentials: true
  }));
app.use(bodyParser.json())

app.use((req, res, next)=>{
    console.log(`${ new Date().toString()} => ${req.originalUrl}`)
    

     next()
})
// app.use(personRoute)
// app.use(customerRoute)
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))
 
const PORT = process.env.PORT || 3000

MongoClient.connect(db.uri, { useNewUrlParser: true },(err,database)=>{
    if(err){
        console.log("Coudln't connect to mongo. Error"+err);
    } else{
        require('../public/Routes')(app, database)
        app.listen(PORT, ()=> console.info(`Server has been started on ${PORT}`))
        console.log("Connected to mongo, db good to go")
    }
  }
)


