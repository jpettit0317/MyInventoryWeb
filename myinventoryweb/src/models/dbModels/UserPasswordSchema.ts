import { Schema } from "mongoose";

const userPasswordSchema = new Schema({
    username: String,
    password: String,
    salt: String
});

export default userPasswordSchema;