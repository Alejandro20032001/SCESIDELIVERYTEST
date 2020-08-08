import express from "express";
import {Store} from "../models";
import { mdJWT } from "../middleware/verifyToken";

const stores = express.Router()


stores.post("", (req, res, next) => {
    const { body } = req
    console.log(body);
    Store.create(body)
        .then(storeCreated => {
            res.nosql = storeCreated
            res.msg = 'Store created'
            res.status(201).json(storeCreated)
        })
    .catch(err => {
        res.status(500).json(err)
    })
});
// all 
stores.get('', (req, res, next) => {
    const {body} = req.query
    console.log({body}) 
    if(body !=   undefined){
        const {storeName} = req.query
        Store.findOne({
            name: storeName
        })
        .then(storeFound => {
            if (storeFound)
                res.status(200).json(storeFound)
            else
                res.status(404).json({ msg: 'No found store' })
            }) 
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
    else{
        Store.find({}).then(storesFound => {
            res.status(200).json(storesFound)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}) ;

stores.get('/:storeID', (req, res, next) => {
    const { storeID: id } = req.params
    Store.find({_id: id}).isDeleted(false)
    .then(storeFound => {
        if (storeFound){
            res.status(200).json(storeFound)
        }
        else{
            res.status(404).json({ msg: 'No found store' })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err)
    })
    /*
    Store.findOne({
        _id: id
    })
    .then(storeFound => {
        if (storeFound){
            res.status(200).json(storeFound)
        }
        else{
            res.status(404).json({ msg: 'No found store' })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err)
    })*/
}) 
// borrado en cascada............... borrar items?
stores.put("/:storeID",(req, res, next) => {
    const { storeID: id } = req.params
    if (id) {
        let response = {}
        Store.findOne({
            _id: id
        })
        .then(storeFound => {
            if (storeFound){
                storeFound.softdelete(function(err, newTest) {
                    if (err) { res.json(err) }  
                  });
                console.log("si se borro")
                res.status(200).json(storeFound)
            }
            else{
                res.status(404).json({ msg: 'No found store' })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })/*
        Store.findByIdAndDelete({_id:id}, function(err, docs) {
            if(!err){
                response.nosql = docs         
                console.log(response)
                return docs
            }
        }).then(() => {
            response.msg = 'store delete'
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send({ msg: 'Error on delete the store' })
        })*/
    } else{
        res.status(400).send({ msg: 'No data' })
    }
});
stores.get("/get/info/", mdJWT, (req, response) => {
    response.status(200).json({
        msg: 'ok'
    })
});
//actualizado en cascada
stores.patch("/:storeID",(req,res,next)=>{
    const{ storeID : id} = req.params
    const {body} = req
    //console.log(body)
    if(req.body){
        let response = {}
        Store.findByIdAndUpdate(
            {_id:id},
            {
                name: req.body.name,   
            },
            function(err, result) {
                if (!err) {
                    response.anterior = result
                }
            }
        ).then(storeUpdated=> {
            response.nuevo = storeUpdated
            response.msg = 'store updated'
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
                res.status(500).send({ msg: 'Error on update the name' })
            })
    } else{
        res.status(400).send({ msg: 'No data' })
    }
})
export default stores