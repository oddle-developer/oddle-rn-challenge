import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Constants } from 'lybrid-common'
import Global from 'lybrid-global';

class Languages {

      strings: any = {
            ja: {
                  'system.no.internet.connection': "Not connected to network. Please try after checking.",
                  'system.server.internal.error': "Could not connect to server. Please try again.",
                  'system.error.tryagain': "Try Again",
                  'system.dialog.ok': "Ok",
                  'system.dialog.cancel': "Cancel",
                  'system.dialog.done': "Done",
                  'screen.empty': "No data found.",
                  'system.verifytoken.fail.message': "Account information not found. Please restart the app and try again.",
                  'system.verifytoken.fail.quit': "Quit",
                  'system.verifytoken.fail.tryagain': "再試行",
                  'system.dialog.exitapp': "Press the back button again to exit the app.",
                  'screen.splash.loading': "Loading",
                  'system.back.confirm': "[Dev]Are you sure wanna go back？",
                  'system.back.confirm.yes': "Yes",
                  'system.back.confirm.no': "No",
                  'system.dialog.update': "[Dev]Update message",

                  
                  'system.greeting.morning': 'Good Morning!',
                  'system.greeting.afternoon': 'Good Afternoon!',
                  'system.greeting.evening': 'Good Evening!',

                  'screen.home.title': 'Home',
                  'screen.home.wellcome': 'Wellcome to Oddle!',
                  'screen.home.explore': `Let's explore!`,

                  'screen.shop.title': `Shop`,
                  
                  'screen.favourites.title': `Favourites`,
                  'screen.favourites.wellcome': `You don't have any favourites yet!`,
                  'screen.favourites.explore': `Let's explore!`,
                  'system.data.empty': "N/A",

            },
            'zh-Hant': {
            },
            'zh-Hans': {
            },
            en: {
            },
            vi: {
            }
      }

      async loadLanguage() {
            let lang = await AsyncStorage.getItem(Constants.Store.AppLang);
            // this.strings.setLanguage(lang ? lang : 'ja');
            // this.strings.setLanguage('zhs');
            Global.lang = lang != null ? lang : 'ja';
      }

      replaceAll(str: string, find: string, replace: string) {
            return str.replace(new RegExp(find, 'g'), replace);
      }

      get(key: string, params: any = {}): string {
            let lang = Global.lang ? Global.lang : 'ja';
            if (this.strings[lang]) {
                  let temp = this.strings[lang][key];
                  // if (temp == null || temp == "") {
                  //   temp = this.strings.ja[key]
                  // }

                  if (temp == null || temp == "") {
                        temp = key
                  } else {
                        for (const prop in params) {
                              temp = this.replaceAll(temp, `{${prop}}`, params[prop] ? params[prop] : "");
                        }
                  }
                  if (temp == null) {
                        temp = ""
                  }
                  return temp.trim();
            } else {
                  return key;
            }
      }
}

export default new Languages();
