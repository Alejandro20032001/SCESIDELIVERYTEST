import { Schema, model } from 'mongoose'

const DealerSchema = new Schema({
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
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders' }],
})

export default model('Dealer', DealerSchema)
