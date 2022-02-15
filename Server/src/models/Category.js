import mongoose from 'mongoose';
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
    } 
}, {
    timestamps: true,
})

export const Category = mongoose.model('category', schema)