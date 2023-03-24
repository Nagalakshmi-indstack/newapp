const express = require('express')
const app = express()
const port = 3001

const bodyParser = require('body-parser');
 
var cors = require('cors');
app.use(cors())
//connect to the database
 
const mysql = require('mysql')

var con = mysql.createConnection({
  host: "mysql.razs.me",
  user: "flh_user",
  password: "z3M5-gQDX_Ba!8[2",
  database: "flh_app"
})

con.connect(function(err){
  if(err) throw err;
  console.log("connected")
})

app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//read data
app.get('/users', (req,res) => {

  let sqlQuery= "SELECT * FROM `users`"
  con.query(sqlQuery, function(err, result){
    if(err) throw err;
   res.send(result)
})
})
//post data

app.post('/users', (req,res) => {
//save this data in DB
let data=req.body;
let sqlQuery = `INSERT INTO users (id, name, email, mobile, countryCode, password, createdAt, updatedAt, createdBy, updatedBy, status) VALUES (NULL, '${data.name}', '${data.email}', '${data.mobile}', '91', '${data.password}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', '', '1');`
con.query(sqlQuery, function(err, result){
  if(err) throw err;
  if(result.insertId)
  res.send({userId: result.insertId, message: "Registration is successful!" })
});

})

//update data

app.patch('/users/:id', (req,res) => {
let data = req.body;
 let sqlQuery = `UPDATE users SET name = '${data.name}', email = '${data.email}', password = '${data.password}' WHERE users.id = '${req.params.id}';`
 con.query(sqlQuery, function(err, result){
  if(err) throw err;
  if(result.affectedRows)
  res.send({message: "Updated successful!" }) 
 })

})

//delete data

app.delete('/users/:id', (req,res) => {
  let sqlQuery=`DELETE FROM users WHERE users.id = '${req.params.id}';`
  con.query(sqlQuery, function(err, result){
    if(err) throw err;
    if(result.affectedRows) 
  res.send({message:"deleted succesfully"})
})
})

app.post('/users/login', (req,res) =>{
  let data=req.body;
  
  let sqlQuery=`SELECT id, name, email, mobile FROM users WHERE email LIKE '${data.email}'AND password LIKE '${data.password}'`

  con.query(sqlQuery, function(err,result) {

    if(err) throw err;
    if(result.length)
    res.send(result[0])
    else
    res.send({message:"Incorrect email/password"})
  });
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})