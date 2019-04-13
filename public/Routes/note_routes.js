var ObjID = require('mongodb').ObjectID

module.exports = function(app, dob) {
///////////////////////////     Get        //////////////////////////////////////////////////
///{/notes:: database name}
app.post("/GetData", (req, res) => {
    const data = { 
      "_id": ObjID(req.body.ID),
      };
    let db = dob.db("Gym");
    db.collection("Data").find(data).toArray ((err, result) => {
    
      if (err) {
        return res.send({ error: "An Error Has Occured" });
      } else {
        if (result == null)
        {
           res.json("Data Not Found!!!!");
        }
        else { console.log(result)
        //  return res.send(result.ops[0])  /// result
        return res.json(result);}
      }
     
    });
  });

  ///////////////////////////     Get ALL DATA       //////////////////////////////////////////////////
///{/notes:: database name}
app.post("/GetAllData", (req, res) => {
  const data = { 
    // "_id": ObjID(req.body.ID),
    };
  let db = dob.db("Gym");
  db.collection("Data").find(data).toArray ((err, result) => {
  
    if (err) {
      return res.send({ error: "An Error Has Occured" });
    } else {
      if (result == null)
      {
         res.json("Data Not Found!!!!");
      }
      else { console.log(result)
      //  return res.send(result.ops[0])  /// result
      return res.json(result);}
    }
   
  });
});
//////////////////////////////// Delete   //////////////////////////////////////////////
app.post("/Delete", (req, res) => {
    const data = { 
      "_id": ObjID(req.body.ID),
      };
    let db = dob.db("Gym");
    db.collection("Data").deleteOne(data, (err, result) => {
    
      if (err) {
        return res.send({ error: "An Error Has Occured" });
      } else{
        if (result == null)
        {
           res.json("Data Not Found!!!!");
        }
        else {  
           console.log(result.result.n)
        //  return res.send(result.ops[0])  /// result
           return res.json('Note   ' + '   Was Deleted');
        }
      }
    });
  });
////////////////////////////////----- Update-----//////////////////////////////////////////////
app.post("/Update", (req, res) => {
    const id = { 
      "_id": ObjID(req.body.ID),
     
      };
    const data = {
    "FirstName": req.body.FirstName,
    "LastName": req.body.LastName };

     let db = dob.db("Gym");
    db.collection("Data").update(id,{$set:data}, (err, result) => {
    
      if (err) {
        return res.send({ error: "An Error Has Occured" });
      }else {
        if (result == null)
        {
           res.json("Data Not Found!!!!");
        }
        else { console.log(result)
        return res.send('Note' + id + 'Was updated' + result);}
      }
      
     
    });
  });
////////////////////////////////----- Register ----- ///////////////////////////////////////////////
  app.post("/Register", (req, res) => {
    const regdata = { 
      "APIKEY": req.body.APIKEY,
      "FirstName": req.body.FirstName,
      "LastName": req.body.LastName ,
      "TaxID" : req.body.TaxID,
      "Email" : req.body.Email,
      "Password" : req.body.Password,
      "BusinessName" : req.body.BusinessName,
      "DeviceType" : req.body.DeviceType,
      "DeviceID" : req.body.DeviceID};

    let db = dob.db("Gym");
    db.collection("Data").insertOne(regdata, (err, result) => {
    
      if (err) {
          res.send({Data:"Fill All Data"})
      } else {
        console.log(result.ops[0])
        return res.send(result.ops[0]);
      }
    });
  });

////////////////----- Login -----///////////////////////////////// 
  app.post("/Login", (req, res) => {
    const regdata = { 
      // "APIKEY": req.body.APIKEY,
      "Email" : req.body.Email,
      "Password" : req.body.Password,
      };
    let db = dob.db("Gym");
    db.collection("Data").find(regdata).toArray ((err, result) => {
      
      if (err) {
            res.send("DAta not Valid")
      } else {
        if (result == null)
        {
           res.JSON("Data Not Found!!!!");
        }
        else { 
          console.log(result)
          return res.send(result);}
      }
     
    });
  });
};
exports.create = (req, res) => {
  // Validate request
  if(!req.body.content) {
      return res.status(400).send({
          message: "Note content can not be empty"
      });
  }

  // Create a Note
  const note = new Note({
      title: req.body.title || "Untitled Note", 
      content: req.body.content
  });

  // Save Note in the database
  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Note."
      });
  });
};