import { StyleSheet } from 'react-native'
import Colors from './Colors'
import Constants from './Constants'

export default StyleSheet.create({
    wellcomeBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wellcomeText: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        fontSize: Constants.FontSize.medium,
        fontWeight: 'bold',
    },
    wellcomeIcon: {
        marginBottom: 20,
        opacity: 0.8
    },
    wellcomeButton: {
        backgroundColor: '#1C0056'
    },
    tabBarContainerFake: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 15,
        shadowColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.94,
    },
    tabBarContainer: {
        position: 'absolute',
        // borderTopColor: '#ebebeb',
        // borderTopWidth: 0.5,
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabBarContent: {
        flexDirection: 'row',
        height: 70,
    },
    tabBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Constants.MeasureSize(60),
    },
    button: {
        width: 'auto',
        height: Constants.MeasureSize(40),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.MeasureSize(20),
        borderRadius: Constants.MeasureSize(4),
        backgroundColor: Colors.buttonBackground,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: Constants.FontSize.small,
        color: Colors.buttonText,
    },
    hyperLink: {
        width: 'auto',
        // height: Constants.MeasureSize(40),
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: Constants.MeasureSize(20),
        borderRadius: Constants.MeasureSize(8),
    },
    hyperLinkText: {
        textAlign: "center",
        fontSize: Constants.FontSize.small,
        color: Colors.hyperLinkText,
        textDecorationLine: 'underline',
    },
    shadowSmallLight: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    shadowSmall: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
    },
    shadowSmallTop: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        elevation: 2,
    },
    shadowMedium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    gravityCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontLight: {
        fontWeight: '300',
        // fontFamily: "SFProDisplay-Light"
    },
    fontRegular: {
        // fontFamily: "IBM Plex Sans"r
    },
    fontMedium: {
        // fontFamily: "SFProDisplay-Medium"
    },
    fontBold: {
        fontWeight: 'bold',
        // fontFamily: "SFProDisplay-Bold"
    }
});