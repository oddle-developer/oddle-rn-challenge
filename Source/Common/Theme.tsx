import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PlatformOSType } from 'react-native';
const fontConfig: any = {
    ios: {
        regular: {
            fontFamily: 'IBMPlexSans-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'IBMPlexSans-Medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'IBMPlexSans-Light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'IBMPlexSans-Thin',
            fontWeight: 'normal',
        },
    },
    android: {
        regular: {
            fontFamily: 'IBMPlexSans-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'IBMPlexSans-Medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'IBMPlexSans-Light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'IBMPlexSans-Thin',
            fontWeight: 'normal',
        },
    }
}
export const config = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
};