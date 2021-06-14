'use strict'

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');

const server = express();
 
server.use(express.json());
server.use(cors());
server.get('/getdata',getdata);
server.post('/addtofav',addtofav);
server.get('/getfav',getfav);
server.delete('/deletefun/:id',deletefun);
// server.put('/updatefun/:index',updatefun)


const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/digimon',
    { useNewUrlParser: true, useUnifiedTopology: true });


    const digSchema= new mongoose.Schema({
        name:String,
        img:String,
        level:String
    })

    const digModel= mongoose.model('digimon',digSchema);

    function addtofav(req,res){
        const {img,name,level}=req.body;
        const datan= new digModel( {
            img:img,
            name:name,
            level:level
        })
        console.log(req.body);
        datan.save()
    }


   function getdata(req,res){
       const url =`https://digimon-api.vercel.app/api/digimon`;
       axios.get(url).then(result=>{
             const alldata=  result.data.map(item=>{
               return new Digimon(item)
           })
           res.send(alldata)
       })
   }

function deletefun(req,res){
    const id= req.params.id
    digModel.remove({_id:id},(err,data)=>{
        digModel.find({}, (err,data2)=>{
            res.send(data2)
        }) 
    })
}
//  i think i have santax error

// function updatefun(req,res){
  
//      digModel.find({},(err.data) =>{
//                 data.map((item,idx)=>{
//              if (idx == req.params.index){
//                   item.img=req.body.img,
     
//                   item.save()
//                  res.send(data)
//      } 
//  }) 
// })
// }


function getfav(req,res){
    digModel.find({}, (err,data)=>{
        res.send(data)
    })
}
    // https://digimon-api.vercel.app/api/digimon
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
class Digimon{
    constructor(data){
        this.name=data.name,
        this.img=data.img,
        this.level=data.level
    }
}