import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemId: String,
    title: String,
    owner: String,
    type: String,
    count: Number,
    countUnit: String,
    description: String
});

export default itemSchema;