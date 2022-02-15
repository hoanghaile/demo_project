import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
export const Token = mongoose.model("token", tokenSchema)