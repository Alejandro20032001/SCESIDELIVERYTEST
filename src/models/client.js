import { Schema, model } from 'mongoose'
const ClientSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    orders:[{ type: Schema.Types.ObjectId, ref: 'Order' }]
})

export default model('Client', ClientSchema)
