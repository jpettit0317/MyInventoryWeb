import mongoose from 'mongoose';
import IUserInfo from '../../interfaces/modelinterfaces/UserInfo';
import userInfoSchema from '../dbModels/UserInfoSchema';

const UserConnection = mongoose.createConnection("mongodb://localhost:27017/testUserDB");

UserConnection.once("open", () => {
   // console.log("Connected to DBUser");
});

export const DBUser: mongoose.Model<IUserInfo> = UserConnection.model<IUserInfo>("DBUser", userInfoSchema, "testUserDB");