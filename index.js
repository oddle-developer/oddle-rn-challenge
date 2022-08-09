
import { AppRegistry, Text, Image } from 'react-native';
import App from './Source/Main/App';
import { name as appName } from './app.json';
import { Constants } from 'lybrid-common'

//@ts-ignore
Text.defaultProps = Text.defaultProps || {};
//@ts-ignore
Text.defaultProps.allowFontScaling = false;
//@ts-ignore
Text.defaultProps.color = '#515C6F';
//@ts-ignore
Text.defaultProps.style = { fontSize: Constants.FontSize.small, color: '#515C6F', fontFamily: "IBM Plex Sans" }
// Text.defaultProps.style = { fontFamily: "IBM Plex Sans" }
//@ts-ignore
Image.defaultProps = Image.defaultProps || {};
//@ts-ignore
Image.defaultProps.style = { resizeMode: 'center' }


AppRegistry.registerComponent(appName, () => App);
