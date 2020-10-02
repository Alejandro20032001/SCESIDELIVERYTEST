import { Schema, model } from 'mongoose'
import soft_delete from 'mongoose-softdelete' 

//linea en blanco aumentada
const StoreSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    items : [{ type: Schema.Types.ObjectId, ref: 'Items' }]
})
StoreSchema.plugin(soft_delete)
export default model('Store', StoreSchema)
