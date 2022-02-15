import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema

const schema = new Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
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

export const Admin = mongoose.model('admins', schema);

// const validate = (admins) => {
//     const schema = Joi.object({
//         username: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().required()
//     });
//     return schema.validate(admins)
// }
// export default { Admin, validate };