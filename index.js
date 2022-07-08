// expressjs code index.js code
const express = require ('express');
const bodyparser = require ('body-parser');
const cors = require ("cors");
const mysql = require ('mysql2');

const app= express();

app.use(cors());
app.use(bodyparser.json());

//connect sql db
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userinfo',
    port: 3306
})

//check database
    db.connect( err => {
    if(err){console.log('err')}
    console.log('database connected successfully')
  })

          //get dada method

     app.get('/userRoutes',(req ,res) =>{
          //console.log('server get data');
          let qrr = ` SELECT * FROM  users `;
          db.query(qrr,(err,results)=>{

         if(err){
             console.log( err,'errs');
         }

         if(results.length>0){
             res.send({
                 massage:'All users Data',
                 data:results
             });
          };
     });
       
  });

  //get single data by id
    app.get('/userRoutes/:id',(req,res)=>{
        //console.log(req.params.id);
        let qrId = req.params.id;
        let qr = `SELECT * FROM users where id= ${qrId}`;
        db.query(qr,(err,results)=>{
            if(err){console.log(err);}
            if(results.length>0){
                res.send({
                    massage:"get data by ID",
                    data:results
                })
            }res.send({
                massage:"data not found..!"
            });
        });
    });

  //post data
  app.post('/userRoutes',(req,res)=>{
   // console.log("post data sucssesfully");

    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    let qr = `INSERT INTO users (name,email,phone) VALUE ('${name}','${email}','${phone}')`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
           res.send({
            massage:"data added Successfully",
            data:results
        });
    });


 });

  //Put data OR Update
  app.put('/userRoutes/:id', (req,res)=>{
      //console.log(req.body,"Update data")
      let uID = req.params.id;
      let name = req.body.name;
      let email = req.body.email;
      let phone = req.body.phone;

  let qr =`UPDATE users SET name ='${name}',email ='${email}',phone ='${phone}' WHERE id = ${uID}`;

    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
                   massage:"data Update"
        })
    })
  })

  //delete data
    app.delete('/userRoutes/:id', (req,res)=>{
    let uID = req.params.id;
    let qr = `delete from users where id ='${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            massage:"data deleted sucessfully..!"
        })
    })
})
  


app.listen (3000);
console.log("server listning port 3000,subodh");

