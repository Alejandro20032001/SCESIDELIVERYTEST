import express from "express";
import {Store} from "../models";


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
    })
}) 
// borrado en cascada............... borrar items?
stores.put("/:storeID", (req, res, next) => {
    const { storeID: id } = req.params
    if (id) {
        let response = {}
        Store.findOneAndDelete({_id:id}, function(err, docs) {
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
        })
    } else{
        res.status(400).send({ msg: 'No data' })
    }
});
//actualizado en cascada
stores.patch("/:storeID",(req,res,next)=>{
    const{ storeID : id} = req.params
    const {body} = req
    console.log(body)
    if(req.body){
        let response = {}
        Store.updateOne(
            {_id:id},
            {
                name: req.body.name,   
            }
        ).then(storeUpdated=> {
            response.nosql = storeUpdated
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