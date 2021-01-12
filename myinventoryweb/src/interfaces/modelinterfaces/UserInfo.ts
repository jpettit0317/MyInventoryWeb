import mongoose from "mongoose";

interface IUserInfo extends mongoose.Document {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    userId: string
}

export default IUserInfo;