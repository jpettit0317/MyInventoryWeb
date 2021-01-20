import { Model, Connection, createConnection } from 'mongoose';
import IUserInfo from '../../interfaces/modelinterfaces/UserInfo';
import userInfoSchema from '../dbModels/UserInfoSchema';


export const UserCollectionInfo = {
  collectionName: "testUserDB",
  modelName: "DBUser"
};

export function createUserModel(connection: Connection): Model<IUserInfo> {
   connection.once("open", () => {
      console.log("Connected to DBUser");
   });

   return connection.model<IUserInfo>(
      UserCollectionInfo.modelName,
      userInfoSchema,
      UserCollectionInfo.collectionName
   );
}

export function createUserConnection(): Connection {
   return createConnection(`mongodb://localhost:27017/${UserCollectionInfo.collectionName}`);
}

export async function closeUserConnection(userConnection: Connection): Promise<void> {
   return new Promise(async (resolve, reject) => {
      await userConnection.close().then(() => {
         console.log("User connection was closed succesfully");
         resolve();
      }).catch((reason: string) => {
         console.log(`Failed to close user connection beacuse ${reason}`);
         reject();
      })
   });
}