
import { Dimensions, Platform } from "react-native"

function Dimen() { };

Dimen.isLandscape = function () {
  const widthScreen = Dimensions.get('window').width
  const heightScreen = Dimensions.get('window').height
  return widthScreen > heightScreen
}

Dimen.getScreenWidth = function () {
  return Dimensions.get('window').width;
}

Dimen.getScreenHeight = function () {
  return Dimensions.get('window').height;
}

Dimen.getMinSize = function () {
  let w = Dimensions.get('window');
  return w.height > w.width ? w.width : w.height;
}

Dimen.isIPhoneXSize = function (dim: any) {
  return dim.height == 812 || dim.width == 812;
}

Dimen.isIPhoneXrSize = function (dim: any) {
  return dim.height == 896 || dim.width == 896;
}

Dimen.isIphoneX = function () {
  let dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' && (Dimen.isIPhoneXSize(dim) || Dimen.isIPhoneXrSize(dim))
  );
}

export default Dimen;
