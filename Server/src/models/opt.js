import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const optSchema = new Schema({
    email: String,
    code: String,
    expierIn: Number,
}, {
    timestamps: true
})

export const Otp = mongoose.model('opt', optSchema)