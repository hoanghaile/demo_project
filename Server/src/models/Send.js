import mongoose from 'mongoose';
const Schema = mongoose.Schema

const schema = Schema({
    name: {
        type: String,
    },
    address: {
        type:String
    },
    phone: {
        type: String,
        unique: true
    },
    text: {
        type: String
    },
    clothes: {
        type: Number
    },
    car: {
        type: Number,
    },
    mark: {
        type: Number,
    },
    vegetable: {
        type: Number,
    },
    rice: {
        type: Number
    },
    noodles: {
        type: Number
    },
    milk: {
        type: Number
    },
    egg: {
        type: Number
    },
    status: {
        type: Boolean
    }
}, {
    timestamps: true,
})
export const Send = mongoose.model('send', schema)