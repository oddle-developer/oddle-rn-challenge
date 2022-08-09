import { Dimensions, Platform } from 'react-native'
import { Languages, Logging, Constants } from 'lybrid-common'
import Global from 'lybrid-global';
import { StackActions, CommonActions, ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
require('moment/locale/de')
require('moment/locale/es')
require('moment/locale/vi')
require('moment/locale/ja')
require('moment/locale/zh-cn')
require('moment/locale/zh-hk')
require('moment/locale/zh-tw')
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

function Utils() { };

Utils.checkEmail = function (val: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase());
}

Utils.checkString = function (str: string) {
    return true;//!/[~`!#$%\^&*+=\[\];,/{}|\\":<>\?]/g.test(str);
}

Utils.navigateAndResetStack = function (navigation: NativeStackNavigationProp<ParamListBase>, screen: string) {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                {
                    name: screen
                }
            ],
        })
    );
}

Utils.navigateAndResetStack2 = function (navigation: NativeStackNavigationProp<ParamListBase>, screen1: string, screen2: string, data1: any, data2: any) {
    Logging.log('screen1')
    Logging.log(screen1)
    Logging.log('screen2')
    Logging.log(screen2)
    navigation.dispatch(
        CommonActions.reset({
            index: 2,
            routes: [
                {
                    name: screen1,
                    params: data1,
                },
                {
                    name: screen2,
                    params: data2,
                }
            ],
        })
    );
}

Utils.replace = function (navigation: NativeStackNavigationProp<ParamListBase>, routeName: string, params: any) {
    navigation.dispatch(
        StackActions.replace(routeName, params)
    );
}

Utils.navigatePop = function (navigation: NativeStackNavigationProp<ParamListBase>, n: number) {
    navigation.dispatch(StackActions.pop(n));
}

Utils.isSameOrBeforeToday = function (timestamp: string) {
    let d1 = moment(timestamp).format("YYYY-MM-DD")
    let d2 = moment(new Date()).format("YYYY-MM-DD")

    let d1d = moment(d1, "YYYY-MM-DD")
    let d2d = moment(d2, "YYYY-MM-DD")

    return d1d.isSameOrBefore(d2d);
}

Utils.isSameOrAfterToday = function (timestamp: string) {
    let d1 = moment(timestamp).format("YYYY-MM-DD")
    let d2 = moment(new Date()).format("YYYY-MM-DD")

    let d1d = moment(d1, "YYYY-MM-DD")
    let d2d = moment(d2, "YYYY-MM-DD")

    return d1d.isSameOrAfter(d2d);
}

Utils.isSameToday = function (timestamp: string) {
    let d1 = moment(timestamp).format("YYYY-MM-DD")
    let d2 = moment(new Date()).format("YYYY-MM-DD")

    let d1d = moment(d1, "YYYY-MM-DD")
    let d2d = moment(d2, "YYYY-MM-DD")

    return d1d.isSame(d2d);
}

Utils.isSame = function (timestamp1: string, timestamp2: string) {
    let d1 = moment(timestamp1).format("YYYY-MM-DD")
    let d2 = moment(timestamp2).format("YYYY-MM-DD")

    let d1d = moment(d1, "YYYY-MM-DD")
    let d2d = moment(d2, "YYYY-MM-DD")

    return d1d.isSame(d2d);
}

Utils.isBefore = function (timestamp1: string, timestamp2: string) {
    let d1 = moment(timestamp1).format("YYYY-MM-DD")
    let d2 = moment(timestamp2).format("YYYY-MM-DD")

    let d1d = moment(d1, "YYYY-MM-DD")
    let d2d = moment(d2, "YYYY-MM-DD")

    return d1d.isBefore(d2d);
}

Utils.isAfter = function (timestamp1: string, timestamp2: string) {
    let d1 = moment(timestamp1).format("YYYY-MM-DD")
    let d2 = moment(timestamp2).format("YYYY-MM-DD")

    let d1d = moment(d1, "YYYY-MM-DD")
    let d2d = moment(d2, "YYYY-MM-DD")

    return d1d.isAfter(d2d);
}

Utils.isBefore2 = function (timestamp1: string, timestamp2: string) {
    let d1 = moment(timestamp1).format("YYYY-MM-DD HH:mm:ss")
    let d2 = moment(timestamp2).format("YYYY-MM-DD HH:mm:ss")

    let d1d = moment(d1, "YYYY-MM-DD HH:mm:ss")
    let d2d = moment(d2, "YYYY-MM-DD HH:mm:ss")

    return d1d.isBefore(d2d);
}

Utils.isAfter2 = function (timestamp1: string, timestamp2: string) {
    let d1 = moment(timestamp1).format("YYYY-MM-DD HH:mm:ss")
    let d2 = moment(timestamp2).format("YYYY-MM-DD HH:mm:ss")

    let d1d = moment(d1, "YYYY-MM-DD HH:mm:ss")
    let d2d = moment(d2, "YYYY-MM-DD HH:mm:ss")

    return d1d.isAfter(d2d);
}

Utils.formatDateForCalendar = function (timestamp: string) {
    return moment(timestamp).format("YYYY-MM-DD");
}

Utils.getTimeLangCode = function (timestamp: string | null = null) {
    if (Global.lang == 'zh-Hans') {
        return 'zh-hk'
    }
    if (Global.lang == 'zh-Hant') {
        return 'zh-tw'
    }
    return Global.lang
}

//2019/02/19(火) 12:17 
Utils.formatDateTimeDefault = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM/DD(dd) HH:mm:ss");
}

Utils.formatDateTimeDefault2 = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM/DD HH:mm");
}

Utils.formatDateTimeEnDefault = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM/DD HH:mm:ss");
}

Utils.formatDateEnDefault = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM/DD(dd)");
}

//2019/02/19(火) 12:17 
Utils.formatShortDateDefault = function (timestamp: string) {
    if (moment(timestamp).isValid())
        return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM/DD");
    return timestamp + ""
}

Utils.formatShortDateDefault2 = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM");
}

//2019/02/19(火) 12:17 
Utils.formatDateDefault = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY年MM月DD日(dddd)")
}

Utils.formatDateDefault2 = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY年MM月DD日dddd")
}

Utils.formatDateDefault3 = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY年MM月DD日")
}

Utils.formatDateDefault4 = function (timestamp: string) {
    return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY年MM月DD日 HH:mm ")
}

Utils.formatDateTime = function (timestamp: string) {
    return moment(timestamp).format('Global.appLang.timeFormat');
}

Utils.formatDate = function (timestamp: string) {
    return moment(timestamp).format('YYYY/MM/DD - HH:mm:ss'.split(' - ')[0]);
}

Utils.formatTime = function (timestamp: string) {
    return moment(timestamp).format('YYYY/MM/DD - HH:mm:ss'.split(' - ')[1]);
}

Utils.formatShortDate = function (timestamp: string) {
    return moment(timestamp).format('YYYY/MM/DD - HH:mm:ss'.split("-")[0]);
}

Utils.getDurationTime = function (timestamp: string) {
    let time = moment(timestamp);
    let now = moment();
    if (time.format('L') === now.format('L')) {
        let duration = moment.duration(now.diff(time));
        return Languages.get('system.time.duration').replace('{duration}', duration.locale(Utils.getTimeLangCode()).humanize())
    } else {
        return moment(timestamp).locale(Utils.getTimeLangCode()).format("YYYY/MM/DD")
    }
}

Utils.getFullDurationTime = function (timestamp: string) {
    let time = moment(timestamp);
    let now = moment();
    let duration = moment.duration(now.diff(time));
    return Languages.get('system.time.duration').replace('{duration}', duration.locale(Utils.getTimeLangCode()).humanize())
}

Utils.isToday = function (timestamp: string) {
    let time = moment(timestamp);
    let now = moment();
    return time.format('L') === now.format('L');
}

Utils.getDurationTimeUTC = function (timestamp: string) {

    let now = moment();
    let time = moment(timestamp + ' +0200')
    let duration = moment.duration(now.diff(time));
    return duration.days() === 0 ? Languages.get('screen.activity.time.duration').replace('{val}', duration.locale(Global.lang).humanize()) : time.format(Global.lang);
}

Utils.getTimeStamp = function (timestamp: string) {
    let time = moment(timestamp);
    return time.toDate().getTime();
}

Utils.getFileName = function (path: string) {
    return path.replace(/^.*[\\\/]/, '')
}
Utils.isIphoneXorAbove = function () {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS
        && (dimen.height === 780
            || dimen.width === 780
            || dimen.height === 812 || dimen.width === 812
            || dimen.height === 844 || dimen.width === 844
            || dimen.height === 896 || dimen.width === 896
            || dimen.height === 926 || dimen.width === 926)
    );
}

Utils.getScreenWidth = function () {
    return Dimensions.get('window').width
}

Utils.getScreenHeight = function () {
    return Dimensions.get('window').height
}

Utils.getHeight = function (ratio: string) {
    let _ratio = ratio ? ratio : '16:9';
    let spl = _ratio.split(':');
    let _r_w = spl[0];
    let _r_h = spl[1];
    if (_r_w && _r_h) {
        return this.getScreenWidth() * parseInt(_r_h) / parseInt(_r_w)
    } else {
        return this.getScreenWidth() * 9 / 16
    }
}

Utils.randomUUID = function (): string {
    return uuidv4();
}

Utils.StringToInt = function getHash(input: string) {
    var hash = 0, len = input.length;
    for (var i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }
    return hash;
}

//Concat hours and minutes to string, convert to number then compare in range
Utils.getGreeting = function getGreeting() {
    var time = parseInt(moment().format("Hmm"));
    if (time >= 301 && time <= 1200) {
        return "Good Morning!";
    } else if (time > 1200 && time <= 1500) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
}

Utils.mergerList = function (source: any, data: any, key: any) {
    data.forEach((item: any) => {
        if (source.filter((_sItem: any) => _sItem[key] == item[key]).length == 0) {
            source.push(item);
        }
    });

    return source;
};



Utils.formatNumberToString = function (v: any, n: any = 0, x: number = 0) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return parseFloat(v).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default Utils;
