import express from "express";
import {Item} from "../models";
import { mdUploadImage } from "../services/uploadFiles";
import fs from 'fs'
import store from "../models/store";
import mongoose from 'mongoose'

const items = express.Router()

items.post("", (req, res, next) => {
    const { body } = req
    console.log(body);
    Item.create({
        name: req.body.name,
        category:
                mongoose.Types.ObjectId(req.body.category),
        store:
                mongoose.Types.ObjectId(req.body.store),
        cost: req.body.cost,        
        price: req.body.price
    })
        .then(itemCreated => {
            res.nosql = itemCreated
            res.msg = 'item created'
            res.status(201).json(itemCreated)
        })
    .catch(err => {
        res.status(500).json(err)
    })
});
// all 
items.get('', (req, res, next) => {
    const {body} = req.query
    console.log({body}) 
    if(body !=   undefined){
        const {itemName} = req.query
        Item.findOne({
            name: itemName
        })
        .then(itemFound => {
            if (itemFound)
                res.status(200).json(itemFound)
            else
                res.status(404).json({ msg: 'No found item' })
            }) 
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
    else{
        Item.find({}).then(itemsFound => {
            res.status(200).json(itemsFound)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}) ;

items.get('/:itemID', (req, res, next) => {
    const { itemID: id } = req.params
    Item.findOne({
        _id: id
    })
    .then(itemFound => {
        if (itemFound){
            res.status(200).json(itemFound)
        }
        else{
            res.status(404).json({ msg: 'No found item' })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err)
    })
}) 
// borrado en cascada............... borrar items?
items.put("/:itemID", (req, res, next) => {
    const { itemID: id } = req.params
    if (id) {
        let response = {}
        Item.findOneAndDelete({_id:id}, function(err, docs) {
            if(!err){
                response.nosql = docs           
                console.log(response)
                return docs
            }
        }).then(() => {
            response.msg = 'item delete'
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send({ msg: 'Error on delete the item' })
        })
    } else{
        res.status(400).send({ msg: 'No data' })
    }
});
//actualizado en cascada
items.patch("/:itemID",(req,res,next)=>{
    const{ itemID : id} = req.params
    const {body} = req
    console.log(body)
    if(req.body){
        let response = {}
        Item.updateOne(
            {_id:id},
            {
                name: req.body.name,
                email: req.body.email    
            }
        ).then(itemUpdated=> {
            response.nosql = itemUpdated
            response.msg = 'item updated'
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

items.post('/upload-image/:itemId', mdUploadImage, (req, res) => {
    console.dir(req.files)
    const { itemId } = req.params
    const { path: image } = req.files.image
    Item.findById(userId)
        .then(async (itemFound) => {
            try {
                await itemFound.update({ image })
            } catch (error) {
                fs.unlinkSync(image)
                res.status(501).json({ msg: 'Image not uploaded and not saved' })
            }
            res.status(201).json({ msg: 'Image uploaded', student: studentFound })
        })
        .catch((err) => {
            console.warn(err)
            res.status(500).json({ msg: 'Image not uploaded' })
        })
})
export default items