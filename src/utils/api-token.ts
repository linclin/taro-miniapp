import Taro from '@tarojs/taro'

class apiToekn {
  getToekn() {
    const currentTime = Date.now();
    var storedApiToken = Taro.getStorageSync('api-token')
    console.log("storedApiToken ",storedApiToken)
    if (storedApiToken) {
      if (currentTime < storedApiToken.expires) {
        return storedApiToken.token ;
      } else {
        return this.setToekn();
      }
    }else{
      return this.setToekn();
    }
  }

  setToekn() {
    const apiUrl = process.env.TARO_APP_API;
    const appId = process.env.TARO_APP_API_APPID;
    const appSecret = process.env.TARO_APP_API_APPSECRET;
    Taro.request({
      url:  `${apiUrl}/api/v1/base/auth`,
      data: {
        AppId: appId,
        AppSecret: appSecret 
      },
      method: "POST",
      timeout:60000,
      mode:"cors",
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success: function (res) {
        Taro.setStorageSync("api-token", {token: res.data.token, expires: Date.now() + 7000 * 1000})
        return res.data.token;
      },
      fail: function (res) { 
        console.log("setToekn fail ",process.env.TARO_APP_API, res)
        return "";
      }
    })
    
  }
}

export default new apiToekn()