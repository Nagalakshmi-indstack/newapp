const express = require("express");
const app = express()
const mysql = require('mysql')
var cors = require('cors')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/user", (req, res) => {


    // const fs=require('fs')
    // const csv = require('csv-parser')
    // const results = []
    // const readCSVFile = ()=> {
    //     fs.createReadStream('import-csv.csv')
    //     .pipe(csv())
    //     .on('data',(data)=>results.push(data))
    //     .on('end', () => {
    
    //         console.log(results.length)
    //         for(const result of results)
    //         {
    //             console.log(`UserName: ${result.name}  Email : ${result.email} MobileNo : ${result.mobileNo}`)
    //         }
    //     })
    // }
    
    // readCSVFile()

    let data = req.body
   console.log(data);
   let sqlQuery = "INSERT INTO `users` (`name`, `email`, `mobile`, `password`, `status`) VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.mobile + "',  '" + req.body.password + "','" + req.body.status + "');"
    
   
      con.query(sqlQuery, (err, result) => {
     if(err) throw err;
     console.log(result);
     if(result.affectedRows) 
     res.send({id: result.insertId, message: "submitted successfully"})
     else
     res.send({message:"something went wrong"})
      })
   
    
   
     })

     app.listen(3306,()=>{
        console.log("server is started on 3306")
      })