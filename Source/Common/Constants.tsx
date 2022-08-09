import { Dimensions, Platform, PixelRatio } from "react-native"
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
const baseSize = (widthScreen < heightScreen) ? widthScreen : heightScreen;
import Languages from './Languages'
import DeviceInfo from 'react-native-device-info';

var settingVer = 1;
var Production = false;
// var scale = Platform.OS == 'android' ? (DeviceInfo.isTablet() ? 8 : 2) : (DeviceInfo.isTablet() ? 8 : 4);
var scale = DeviceInfo.isTablet() ? 0.002 : 0.005;
export default {
  useAxios: true,
  Version: "1.0.1" + (!Production ? "-TEST" : ""),
  Production: Production,
  Time: 1543641377,
  Table: {
    Species: "Species",
    Record: "Record",
    Language: "Language",
  },
  ScreenSize: {
    width: widthScreen,
    height: heightScreen,
    base: baseSize,
  },
  MeasureSize: (number: any): number => {
    return baseSize / 2 * number * scale;
  },
  IsTablet: DeviceInfo.isTablet(),
  LandscapeMode: widthScreen > heightScreen,
  Regex: {
    Phone: /^[0-9-]{10,14}$/,
    Zip: /\b\d{3}[-]\d{4}\b/,
    Email: /^[a-zA-Z0-9_\.]{0,}@[a-zA-Z0-9]{1,}(\.[a-zA-Z0-9]{1,5}){1,2}$/,
    Password: /^[a-zA-z0-9\s]*$/,
  },
  Default: {
    Language: {
      label: 'screen.language.en',
      code: 'ja',
      shortCode: 'ja',
    },
    Version: 1,
    PageSize: 20,
    SplashTime: 2000,
    ScheduleTime: 60 * 60 * 1000,
    NormalRequest: 90 * 1000,
    BackgroundReqest: 15 * 60 * 1000,
    limitBulkImage: 10,
  },
  Language: [
    {
      label: 'screen.language.ja',
      code: 'ja',
      shortCode: 'ja',
    },
    {
      label: 'screen.language.vi',
      code: 'vi',
      shortCode: 'vi',
    },
    {
      label: 'screen.language.en',
      code: 'en',
      shortCode: 'en',
    },
    {
      label: 'screen.language.zhs',
      code: 'zhs',
      shortCode: 'zhs',
    },
    {
      label: 'screen.language.zht',
      code: 'zht',
      shortCode: 'zht',
    }
  ],
  ObservationStatus: {
    NotReady: 0,
    Ready: 1,
    Failed: 2,
    Done: 3,
  },
  Screen: {
    Splash: 'StartApp',
    Dashboard: 'Dashboard',
    Detail: 'Detail',
    Home: 'Home',
    Shop: 'Shop',
    Favourite: 'Favourite',
  },

  FontFamily: Platform.OS == 'ios' ? 'Myriad Pro' : 'Myriad Pro Condensed',

  FontSize: {
    superTiny: 6 * baseSize * scale,
    tiny: 7 * baseSize * scale,
    small: 8 * baseSize * scale,
    medium: 9 * baseSize * scale,
    semi: 10 * baseSize * scale,
    big: 11 * baseSize * scale,
    large: 12 * baseSize * scale,
    super: 13 * baseSize * scale,
    legend: 14 * baseSize * scale,
  },
  Store: {
    FirstLaunch: '@App:FirstLaunch' + settingVer,
    User: '@App:User' + settingVer,
    Version: '@App:Version' + settingVer,
    Session: '@App:Session' + settingVer,
    Master: '@App:Master' + settingVer,
    UUID: '@App:UUID' + settingVer,
    AppLang: '@App:AppLang' + settingVer,
    DataLang: '@App:DataLang' + settingVer,
    AppDataVersion: '@App:AppDataVersion' + settingVer,
    ContentDataVersion: '@App:ContentDataVersion' + settingVer,
    AccessToken: '@App:accessToken' + settingVer,
    RefreshToken: '@App:refreshToken' + settingVer,
    LastPull: '@App:lastPull' + settingVer,
    LastSendLog: '@App:lastSendLog' + settingVer,
    Info: '@App:info' + settingVer,
    LastUUID: '@App:lastUUID' + settingVer,
    Settings: '@App:settings' + settingVer,
    VersionConfig: '@App:VersionConfig' + settingVer,
    LastTest: '@App:lastTest' + settingVer,
    LastTestResult: '@App:lastTestResult' + settingVer,
    Ignore: '@App:ignore' + settingVer,
    Username: '@App:username' + settingVer,
  },
  Event: {
    ReceiveNotification: "ReceiveNotification",
    ToggleSideMenu: "ToggleSideMenu",
    ChangeScreen: "ChangeScreen",
    SyncCompleted: "SyncCompleted",
    LoadLanguage: "LoadLanguage",
    Login: "Login",
    Logout: "Logout",
    PushScreen: "PushScreen",
    CloseMenu: "CloseMenu",
    CloseSideMenu: "CloseSideMenu",
    OpenSideMenu: "OpenSideMenu",
    ShowBottomBar: 'ShowBottomBar',
    HideBottomBar: 'HideBottomBar'
  },
  Api: {
    Limit: 10,
    StatusCode: {
      SUCCESS: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401
    }
  }
}