import { Schema, model } from 'mongoose'

const categoriesSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    items : [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})

export default model('Category', categoriesSchema)
