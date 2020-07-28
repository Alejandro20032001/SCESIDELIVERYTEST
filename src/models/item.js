import { Schema, model } from 'mongoose'

const ItemSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    category: { 
        type: Schema.Types.ObjectId, ref: 'categories',
        index: true,
        unique: true,
        required: true
    },
    store: { 
        type: Schema.Types.ObjectId, ref: 'stores',
        index: true,
        unique: true,
        required: true
    },
    ////float?
    cost: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    //float?
    price: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    images: [String]
})

export default model('Items', ItemSchema)
