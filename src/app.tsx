import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux';
import store from './store/index'
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';


import './sdk/sr'
import './sdk/mtj-wx-sdk'
import './app.scss'
// let persistor = persistStore(store); 

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      console.log(res);
    });
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '版本更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(res => {
      console.log(res);
    });
  }

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
