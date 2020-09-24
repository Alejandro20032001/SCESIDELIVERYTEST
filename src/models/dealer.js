import { Schema, model } from 'mongoose'
import soft_delete from 'mongoose-softdelete' 
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
DealerSchema.plugin(soft_delete)
export default model('Dealer', DealerSchema)
