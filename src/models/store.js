import { Schema, model } from 'mongoose'

const StoreSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    items : [{ type: Schema.Types.ObjectId, ref: 'Items' }]
})

export default model('Store', StoreSchema)
