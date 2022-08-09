import { Alert, Constants, Logging } from 'lybrid-common'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Settings extends Object {

  data: any = {}

  load(callBack: () => void) {
    AsyncStorage.getItem(Constants.Store.Settings, (error, result) => {
      let objs = result ? JSON.parse(result ?? '') : {};
      for (const key in objs) {
        let val = objs[key];
        this.data[key] = val;
      }
      Logging.log(this.data);
      if (callBack) {
        callBack()
      }
    });
  }

  get<T>(key: string) : T {
    return this.data[key] || false;
  }

  getDefault<T>(key: string, mDefault: T) : T {
    return this.data[key] != undefined ? this.data[key] : mDefault;
  }

  set(key: string, value: any) {
    this.data[key] = value;
    AsyncStorage.setItem(Constants.Store.Settings, JSON.stringify(this.data));
    Logging.log(this.data);
  }
}

export default new Settings();
