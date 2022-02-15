import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import users from './src/routers/users.js';
import category from './src/routers/category.js';
import auth from './src/routers/auth.js';
import send from './src/routers/send.js';
import take from './src/routers/take.js';
import mail from './src/routers/mail.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.json());
app.use(cors());

// app.post("/send-mail")

app.use('/users', users);
app.use('/category', category);
app.use('/auth', auth);
app.use('/send', send);
app.use('/take', take);
app.use('/email', mail);

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@small-project.qnu3l.mongodb.net/small-project?retryWrites=true&w=majority`,
            {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
            }
        )
        app.listen(PORT, ()=> {console.log(`Server started on port ${PORT}`)})
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}
connectDB();

