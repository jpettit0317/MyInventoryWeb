import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: String,
    expirationDate: Date,
    sessionId: String
});

export default sessionSchema;