import { StyleSheet } from 'react-native';
import { Colors, Constants, Styles } from 'lybrid-common';
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    toolbarContainer: {
        width: '100%',
        // height: DeviceInfo.hasNotch() ? 90 : 60,
        // paddingTop: DeviceInfo.hasNotch() ? 30 : 0,
        // backgroundColor: Colors.AppBarColor,
    }
});