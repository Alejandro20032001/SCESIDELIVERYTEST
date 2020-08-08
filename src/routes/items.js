import express from "express";
import {Item, Store, Category} from "../models";
import { mdUploadImage } from "../services/uploadFiles";
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import {sign} from '../services/jwtService'
import { mdJWT } from "../middleware/verifyToken.js";

const items = express.Router()

items.post("", (req, res, next) => {
    const { body } = req
    const categoryId = req.body.category
    const storeId = req.body.store
    console.log(body);
    Item.create({
        name: req.body.name,
        category:
                mongoose.Types.ObjectId(categoryId),
        store:
                mongoose.Types.ObjectId(storeId),
        cost: req.body.cost,            
        price: req.body.price
    }).then (itemCreated =>
        Promise.all([
            Store.updateOne({_id:storeId},
            {
                addToSet: {
                    items: itemCreated._id
                }
            }),
            Category.updateOne({_id:categoryId},
            {
                $addToSet: {
                    items: itemCreated._id
                }
            })
        ]))
    .then(itemCreated => {
            res.item = itemCreated
            res.msg = 'item created'
            res.status(201).json(itemCreated)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});
// all 
items.get('', mdJWT,(req, res, next) => {
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
        Item.find({}).populate([{
                path: 'store',
                populate: { path: 'item' }
              },
              {
                path: 'category',
                populate: { path: 'item' }
              }]).then(itemsFound => {
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
    }).populate([{
        path: 'store',
        populate: { path: 'item' }
      },
      {
        path: 'category',
        populate: { path: 'item' }
      }])
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
        Promise.all([
            Item.findOneAndDelete({_id:id}, function(err, docs) {
                if(!err){
                    response.nosql = docs    
                    console.log(response)
                    return docs
                }
            })
        ])
        .then(() => {
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
items.patch("/:itemID",mdJWT,(req,res,next)=>{
    const{ itemID : id} = req.params
    const {body} = req
    console.log(body)
    if(req.body){
        let response = {}
        Item.findOneAndUpdate(
            {_id:id},
            {
                name: req.body.name,
                cost: req.body.cost,
                price: req.body.price
            },
            function(err, result) {
                if (!err) {
                    response.anterior = result
                }
              }
        ).then(itemUpdated=> {
            response.nuevo = itemUpdated
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

items.post('/upload-image/:itemID', mdUploadImage, mdJWT,(req, res) => {
    console.dir(req.files)
    const { itemID } = req.params
    const { path: image } = req.files.image
    Item.findById(itemID)
        .then(async (itemFound) => {
            try {
                await itemFound.update({ images: [image] })
            } catch (error) {
                fs.unlinkSync(image)
                res.status(501).json({ msg: 'Image not uploaded and not saved' })
            }
            res.status(201).json({ msg: 'Image uploaded', item: itemFound })
        })
        .catch((err) => {
            console.warn(err)
            res.status(500).json({ msg: 'Image not uploaded' })
        })
})

items.get('/get-image/:image', mdJWT,(req, res) => {
    console.dir(req.files)
    const { image } = req.params
    const pathFile = `uploads/items/${image}`;
    if(fs.existsSync(pathFile))
        res.sendFile(path.resolve(`uploads/items/${image}`))
    else
        res.status(404).json({ msg: 'Image not found' })
})
export default items