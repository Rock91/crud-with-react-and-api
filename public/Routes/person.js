let express = require('express')

let router =  express.Router()

//QueryString => query property on the Request
router.get('/person', (req, res) =>{
  if(req.query.name)  {
    res.send(` You have requested a person ${req.query.name} ` )
    }
   else {
        res.send(` You have requested a person ` )
        }
})

// Params property on the request object
router.get('/person/:name', (req, res) =>{
    res.send(` You have requested a person ${req.params.name} ` )
})

router.get('/error', (req, res) =>{
    throw new Error (` You is forced Error` )
})

module.exports = router