import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
    username: String,
    userId: String,
    email: String,
    firstName: String,
    lastName: String
});

export default userInfoSchema;