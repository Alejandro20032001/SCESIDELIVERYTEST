import { Schema, model } from 'mongoose'

const ItemSchema = new Schema({
    name: {
        type: String,
        index: true,
        required: true
    },
    category: { 
        type: Schema.Types.ObjectId, ref: 'Category',
        index: true,
        required: true
    },
    store: { 
        type: Schema.Types.ObjectId, ref: 'Store',
        index: true,
        required: true
    },
    ////float?
    cost: {
        type: Number,
        index: true,
        required: true
    },
    //float?
    price: {
        type: Number,
        index: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String]
})

export default model('Items', ItemSchema)
