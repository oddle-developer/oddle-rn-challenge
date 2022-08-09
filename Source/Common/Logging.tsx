import Reactotron from 'reactotron-react-native'

function Logging() { };

Logging.log = function (log1: any, log2: any = null) {
  if (__DEV__) {
    if(log2) {
      Reactotron.log(log1,log2)
    } else {
      Reactotron.log(log1)
    }
  }
}

export default Logging;
