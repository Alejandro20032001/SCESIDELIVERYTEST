import { Schema, model } from 'mongoose'
import soft_delete from 'mongoose-softdelete' 
const StoreSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    items : [{ type: Schema.Types.ObjectId, ref: 'Items' }]
})
StoreSchema.plugin(soft_delete)
export default model('Store', StoreSchema)
