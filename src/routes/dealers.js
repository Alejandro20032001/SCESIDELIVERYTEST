import express from "express";
import {Dealer} from "../models";


const dealers = express.Router()

dealers.post("", (req, res, next) => {
    const { body } = req
    console.log(body);
    Dealer.create(body)
        .then(dealerCreated => {
            res.nosql = dealerCreated
            res.msg = 'Dealer created'
            res.status(201).json(dealerCreated)
        })
    .catch(err => {
        res.status(500).json(err)
    })
});
// all 
dealers.get('', (req, res, next) => {
    const {body} = req.query
    console.log({body}) 
    if(body !=   undefined){
        const {dealerName} = req.query
        Dealer.findOne({
            name: dealerName
        })
        .then(dealerFound => {
            if (dealerFound)
                res.status(200).json(dealerFound)
            else
                res.status(404).json({ msg: 'No found dealer' })
            }) 
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
    else{
        Dealer.find({}).then(dealersFound => {
            res.status(200).json(dealersFound)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}) ;

dealers.get('/:dealerID', (req, res, next) => {
    const { dealerID: id } = req.params
    Dealer.findOne({
        _id: id
    })
    .then(dealerFound => {
        if (dealerFound){
            res.status(200).json(dealerFound)
        }
        else{
            res.status(404).json({ msg: 'No found dealer' })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err)
    })
}) 
// borrado en cascada............... borrar items?
dealers.put("/:dealerID", (req, res, next) => {
    const { dealerID: id } = req.params
    if (id) {
        let response = {}
        Dealer.findOneAndDelete({_id:id}, function(err, docs) {
            if(!err){
                response.nosql = docs           
                console.log(response)
                return docs
            }
        }).then(() => {
            response.msg = 'Dealer delete'
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send({ msg: 'Error on delete the dealer' })
        })
    } else{
        res.status(400).send({ msg: 'No data' })
    }
});
//actualizado en cascada
dealers.patch("/:dealerID",(req,res,next)=>{
    const{ dealerID : id} = req.params
    const {body} = req
    console.log(body)
    if(req.body){
        let response = {}
        Dealer.updateOne(
            {_id:id},
            {
                name: req.body.name,
                email: req.body.email    
            }
        ).then(dealerUpdated=> {
            response.nosql = dealerUpdated
            response.msg = 'dealer updated'
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
export default dealers