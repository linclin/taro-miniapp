import Taro from '@tarojs/taro'

class apiToekn {
  getToekn() {
    const currentTime = Date.now();
    var storedApiToken = Taro.getStorageSync('api-token')
    console.log("storedApiToken ",storedApiToken)
    if (storedApiToken) {
      if (currentTime < storedApiToken.expires) {
        return storedApiToken.token;
      } else {
        this.setToekn().then(({ data }) => {
          return data.token;
        });
      }
    }else{
      this.setToekn().then(({ data }) => {
        return data.token;
      });
    }
  }

  setToekn() {
    const apiUrl = process.env.TARO_APP_API;
    const appId = process.env.TARO_APP_API_APPID;
    const appSecret = process.env.TARO_APP_API_APPSECRET;
    return Taro.request({
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
      },
      fail: function (res) { 
        console.log("setToekn fail ",process.env.TARO_APP_API, res)
      }
    })
  }
}

export default new apiToekn()