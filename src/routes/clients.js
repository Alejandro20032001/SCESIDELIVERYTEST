import express from "express";
import {Client} from "../models";
import { sign } from '../services/jwtService'

const clients = express.Router()

clients.post("", (req, res, next) => {
    const { body } = req
    console.log(body);
    Client.create(body)
        .then(clientCreated => {
            res.nosql = clientCreated
            res.msg = 'Client created'
            res.status(201).json(clientCreated)
        })
    .catch(err => {
        res.status(500).json(err)
    })
});
// all // token
clients.get('', (req, res, next) => {
    const {body} = req.query
    let response = {}
    console.log({body})
    if(body !=   undefined){
        const {clientName} = req.query
        Client.findOne({
            name: clientName
        }).isDeleted(false)
        .then(clientFound => {
            if (clientFound)
                res.status(200).json(clientFound)
            else
                res.status(404).json({ msg: 'No found category' })
            }) 
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
    else{
        Client.find({}).isDeleted(false)
            .then(clientsFound => {
                response.nosql = clientsFound
                res.status(200).json(response)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}) ;

clients.get('/:clientID', (req, res, next) => {
    const { categoryID: id } = req.params
    Client.findOne({
        _id: id
    }).isDeleted(false)
    .then(clientFound => {
        if (clientFound){
            res.status(200).json(clientFound)
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
// borrado en cascada............... borrar items?
clients.put("/:clientID", (req, res, next) => {
    const { clientID: id } = req.params
    if (id) {
        let response = {}
        Client.findOne({
            _id: id
        })
        .then(clientFound => {
            if (clientFound){
                clientFound.softdelete(function(err) {
                    if (err) { res.json(err) }  
                  });
                console.log("si se borro")
                res.status(200).json(clientFound)
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
clients.patch("/:clientID",(req,res,next)=>{
    const{ clientID : id} = req.params
    const {body} = req
    console.log(body)
    if(req.body){
        let response = {}
        Client.findByIdAndUpdate(
            {_id:id},
            {
                name: req.body.name,
                email: req.body.email    
            },
            function(err, result) {
                if (!err) {
                    response.anterior = result
                }
            }
        ).isDeleted(false)
        .then(categoryUpdated=> {
            response.nuevo = categoryUpdated
            response.msg = 'Client updated'
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
                res.status(500).send({ msg: 'Error on update the information' })
            })
    } else{
        res.status(400).send({ msg: 'No data' })
    }
})
export default clients