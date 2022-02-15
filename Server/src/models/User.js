import mongoose from 'mongoose';
const Schema = mongoose.Schema

const schema = new Schema({
    fullname: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
    },
    gender: {
        type: String,    
    },
    address: {
        type: String,    
    },
    passport: {
        type: Number, 
    },
    nationality: {
        type: String,  
    },
    nation: {
        type: String,
    },
    position: {
        type: String,
    },
    work: {
        type: Boolean,
    },
    
},{
        timestamps: true
    });
export const Users = mongoose.model('users', schema)