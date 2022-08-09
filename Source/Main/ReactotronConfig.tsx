import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'

Reactotron.useReactNative();

Reactotron.configure({ name: 'Oddle' })

Reactotron.use(reduxPlugin())

const reactotron = Reactotron.configure({ host: '192.168.1.10' }).connect()
export default reactotron