import type { MongoClient } from "mongodb";

export { };

export interface NotifSettingInterface {
    style?: {[key: string]: string};
    contentStyle?: {[key: string]: string};
}

declare global {
  interface Window {
    renderer3dModelLoaded: boolean;
    createNotif: (msg: string, color: [string, string], time: number, setting?: NotifSettingInterface) => void;
    notifInc: number;
  }

  var _mongoClientPromise: Promise<MongoClient>;
}
