import { Schema, model } from 'mongoose'
import soft_delete from 'mongoose-softdelete' 
const ClientSchema = new Schema({
    uid: String,
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
ClientSchema.plugin(soft_delete)
export default model('Client', ClientSchema)
