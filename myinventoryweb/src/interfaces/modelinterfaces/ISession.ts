import mongoose from "mongoose";

interface ISession extends mongoose.Document {
    user: string;
    expirationDate: string;
    sessionId: string;
};

export default ISession;