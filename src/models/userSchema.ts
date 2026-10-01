import mongoose, {Document, Schema} from "mongoose"


export type User = Document & {
    name: string,
    email: string,
    password: string,
    role: string
}

const UserSchema = new Schema({
    name:{
        required: true,
        type: String,
        trim: true
    },
    email:{
        required: true,
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type: String,
        enum: ['admin'],
        default: 'admin'
    }
});

const User = mongoose.model<User>('User', UserSchema);
export default User;
