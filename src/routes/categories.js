import express from "express";
import {Category} from "../models";
import { sign } from '../services/jwtService'
import { mdJWT } from "../middleware/verifyToken";
const categories = express.Router()

categories.post("", (req, res, next) => {
    const {body} = req
    console.log(body);
    Category.create(body)
        .then(categoryCreated => {
            res.nosql = categoryCreated
            res.msg = 'Category created'
            res.status(201).json(categoryCreated)
        })
    .catch(err => {
        res.status(500).json(err)
    })
});
// all 
categories.get('', (req, res, next) => {    
    const {body} = req.query
    console.log({body})
    if(body !=  undefined){
        const {categoryName} = req.query
        Category.findOne({
            name: categoryName
        }).isDeleted(false)
        .then(categoryFound => {
            if (categoryFound)
                res.status(200).json(categoryFound)
            else
                res.status(404).json({ msg: 'No found category' })
            }) 
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
    else{
        Category.find({}).isDeleted(false).then(categoriesFound => {
            res.status(200).json(categoriesFound)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}) ;
categories.get('/:categoryID', (req, res, next) => {
    const { categoryID: id } = req.params
    Category.findOne({
        _id: id
    }).isDeleted(false)
    .then(categoryFound => {
        if (categoryFound){
            res.status(200).json(categoryFound)
        }
        else{
            res.status(404).json({ msg: 'No found category' })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err)
    })
}) 
// borrado en cascada............... 
categories.put("/:categoryID", (req, res, next) => {
    const { categoryID: id } = req.params
    if (id) {
        let response = {}
        Category.findOne({
            _id: id
        })
        .then(categoryFound => {
            if (categoryFound){
                categoryFound.softdelete(function(err) {
                    if (err) { res.json(err) }  
                  });
                console.log("si se borro")
                res.status(200).json(categoryFound)
            }
            else{
                res.status(404).json({ msg: 'No found store' })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    } else{
        res.status(400).send({ msg: 'No data' })
    }
});
//actualizado en cascada
categories.patch("/:categoryID", (req,res,next)=>{ 
    const{ categoryID : id} = req.params
    console.log(req.body.name)
    if(req.body.name){
        let response = {}
        Category.findByIdAndUpdate(
            {_id:id},
            {name: req.body.name},
            function(err, result) {
                if (!err) {
                    response.anterior = result
                }
              }
        ).isDeleted(false)
        .then(categoryUpdated=> {
            response.nuevo = categoryUpdated
            response.msg = 'Category updated'
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
export default categories