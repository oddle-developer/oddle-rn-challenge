import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from 'lybrid-middleware'
import Global from 'lybrid-global';
import Reactotron from './ReactotronConfig'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider as PaperProvider } from 'react-native-paper';



import { Constants, Languages, Theme } from 'lybrid-common'

declare global {
  export interface String {
    localize(): string;
  }
}

declare global {
  export interface Number {
    measureSize(): number;
  }
}

String.prototype.localize = function (): string {
  return Languages.get(this.toString());
}

Number.prototype.measureSize = function (): number {
  return Constants.MeasureSize(this);
}

var store: any
const middleware = [thunkMiddleware]
if (__DEV__) {
  const enhander = Reactotron.createEnhancer && Reactotron.createEnhancer();
  store = createStore(reducers, compose(applyMiddleware(...middleware), enhander));
}
else {
  store = compose(applyMiddleware(...middleware))(createStore)(reducers);
}

let persistor = persistStore(store)

Global.connected = true;

import Root from './Router'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={Theme.config}>
          {Root}
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}