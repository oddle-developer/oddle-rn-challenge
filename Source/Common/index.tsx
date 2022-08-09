import { GraphQLClient } from 'graphql-request';
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
import * as api from './Api';
import * as theme from './Theme';

export { default as NetworkHelper } from './NetworkHelper'
export { default as Constants } from './Constants'
export { default as Alert } from './Alert'
export { default as Utils } from './Utils'
export { default as Logging } from './Logging'
export { api as RESTApi }
export { default as Dimen } from './Dimen'
export { default as Settings } from './Settings'
export { default as LogUtils } from './LogUtils'
export { default as Styles } from './Style'
export { default as Languages } from './Languages'
export { default as Icons } from './Icons'
export { default as Colors } from './Colors'
export { theme as Theme }
export const EventBus = new EventEmitter();
export const Hygraph = new GraphQLClient(api.GRAPH_API);
