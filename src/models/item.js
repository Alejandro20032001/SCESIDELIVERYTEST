import { Schema, model } from 'mongoose'
import soft_delete from 'mongoose-softdelete' 
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: { 
        type: Schema.Types.ObjectId, ref: 'Category',
        unique: false,
        required: true
    },
    store: { 
        type: Schema.Types.ObjectId, ref: 'Store',
        unique: false,
        required: true
    },
    ////float?
    cost: {
        type: Number,
        required: true
    },
    //float?
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String]
})
ItemSchema.plugin(soft_delete)
export default model('Items', ItemSchema)
