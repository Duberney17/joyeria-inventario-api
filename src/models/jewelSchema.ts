import mongoose, {Document, Schema} from "mongoose"


export type Jewel = Document & {
    name: string,
    description: string,
    category: string,
    material: string,
    weight: number,
    price: number,
    stock: number,
    sku: string,
    photos: string[],
    status: string
}

const JewelSchema = new Schema({
    name:{
        required: true,
        type: String,
        trim: true
    },
    description:{
        required: true,
        type: String,
        trim: true
    },
    category:{
        required: true,
        type: String,
        trim: true
    },
    material:{
        required: true,
        type: String,
        trim: true
    },
    weight:{
        required: true,
        type: Number
    },
    price:{
        required: true,
        type: Number
    },
    stock:{
        type: Number,
        default: 0
    },
    sku:{
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    photos:{
        type: [String],
        default: []
    },
    status:{
        type: String,
        enum: ['disponible', 'apartado', 'vendido'],
        default: 'disponible'
    }
});

const Jewel = mongoose.model<Jewel>('Jewel', JewelSchema);
export default Jewel;
