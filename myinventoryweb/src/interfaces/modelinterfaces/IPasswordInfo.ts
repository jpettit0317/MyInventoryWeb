import mongoose from "mongoose";
interface IPasswordInfo extends mongoose.Document {
    username: string;
    password: string;
    salt: string;
}

export default IPasswordInfo;