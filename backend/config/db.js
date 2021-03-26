import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log(`DB Connected: ${(await conn).connection.host}`.underline.cyan)
    } catch (error) {
        console.error(`DB Error: ${error.message}`.underline.red.bold);
        process.exit(1);
    }
}

export default connectDB;

// useUnifiedTopology,
// useCreateIndex