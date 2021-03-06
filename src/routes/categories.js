import express from "express";
import {Category} from "../models";

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
        })
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
        Category.find({}).then(categoriesFound => {
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
    })
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
        Category.deleteOne({_id:id}, function(err, result) {
            if(err){
                console.warn(err)
                res.status(500).send({ msg: 'Error on delete the category' })
            }
            else{
                response.nosql = result
                response.msg = 'Category delete'
                res.status(200).send(result)
            }
        });
    } else{
        res.status(400).send({ msg: 'No data' })
    }
});
//actualizado en cascada
categories.patch("/:categoryID",(req,res,next)=>{
    const{ categoryID : id} = req.params
    console.log(req.body.name)
    if(req.body.name){
        let response = {}
        Category.updateOne(
            {_id:id},
            {name: req.body.name}
        ).then(categoryUpdated=> {
            response.nosql = categoryUpdated
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