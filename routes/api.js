var express = require('express');
var router = express.Router();
var fs = require('fs');

//endpoints


//CRUD- Create,Read,Update,Delete

//get all
router.get("/",function(req,res){
    try{
    const rawdata = fs.readFileSync("routes/data.json");
    var students = JSON.parse(rawdata);
    console.log(students);
    res.status(200).json(students);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

   res.status(200).json({message : "read the recources"});
});
//create
router.post("/",function(req,res){
    try{
        console.log("posted object is ", req.body);
        //open the file
        const rawdata = fs.readFileSync("routes/data.json");

        //decode the file
        var students = JSON.parse(rawdata);

        var newObj =req.body;

        newObj._id =1;
        //add our new object into array
        students.push(newObj);

        //write the data back to the file
       const data = fs.writeFileSync("routes/data.json",JSON.stringify(students));

       //return the data to the user
       res.status(201).json(newObj);
    }
    catch(err){
        //wrong
        res.status(500).json({message: err.message});

    }
});
//update
router.patch("/:id",function(req,res){
    res.status(200).json({message : "edited the recources"});
});
//delete
router.delete("/:id",function(req,res){
    //capture the ID
    var id = req.params.id;

    //open the file for reading
    const rawdata = fs.readFileSync("routes/data.json");
    var students = JSON.parse(rawdata);

    //if found delete it
    if(students.length >= id){
        //modify it
        students.splice(id,1);

        //write the file
        const data = fs.writeFileSync("routes/data.json",JSON.stringify(students));

        res.status(200).json({message: "Deleted"}); 
    }
    else{
        //if no item found, throw error message
        res.status(500).json({message:"something went wrong"});
    }

    
});

module.exports = router;


