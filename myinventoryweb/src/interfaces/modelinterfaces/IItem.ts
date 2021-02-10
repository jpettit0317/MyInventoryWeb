import mongoose from "mongoose";

interface IItem extends mongoose.Document {
    itemId: string,
    title: string,
    owner: string,
    type: string,
    count: number,
    countUnit: string,
    description: string
}

export default IItem;