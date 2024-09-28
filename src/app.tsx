import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux';
import store from './store/index'
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';


import './sdk/sr'
import './sdk/mtj-wx-sdk'
import './app.scss'
// let persistor = persistStore(store); 

class App extends Component<PropsWithChildren> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          {this.props.children}
        {/* </PersistGate> */}
      </Provider>
    );
  }
}


export default App
