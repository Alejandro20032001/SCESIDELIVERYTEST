import { Schema, model } from 'mongoose'
import soft_delete from 'mongoose-softdelete' 
const categoriesSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    items : [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})
categoriesSchema.plugin(soft_delete)
export default model('Category', categoriesSchema)
