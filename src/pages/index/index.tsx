import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components'
import { AtTabBar, AtCard, AtIcon  } from 'taro-ui'
import uCharts from '../../js_sdk/u-charts.min.js';
import './index.scss'
var uChartsLineInstance = {};
var uChartsPieInstance = {};
export default class Index extends Component<PropsWithChildren> {
  state = {
    current: 0,
    cWidth: 750,
    cHeight: 500,
    pixelRatio: 1,
  }
  componentDidMount () {
    const sysInfo = Taro.getSystemInfoSync();
    let pixelRatio = 1;
    //这里的第一个 750 对应 css .charts 的 width
    let cWidth = 750 / 750 * sysInfo.windowWidth;
    //这里的 500 对应 css .charts 的 height
    let cHeight = 500 / 750 * sysInfo.windowWidth;
    //注意：[支付宝小程序]如果需要在高 DPR（devicePixelRatio）下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩小，例如：
    // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
    //   pixelRatio = sysInfo.pixelRatio;
    //   cWidth = cWidth * pixelRatio;
    //   cHeight = cHeight * pixelRatio;
    // }
    this.setState({cWidth, cHeight, pixelRatio},()=>this.getServerData());
  }
  componentWillUnmount () { }
  componentDidShow () { }
  componentDidHide () { }
  getServerData = ()=>{
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
            categories: ["2018","2019","2020","2021","2022","2023"],
            series: [
              {
                name: "成交量A",
                data: [35,8,25,37,4,20]
              },
              {
                name: "成交量B",
                data: [70,40,65,100,44,68]
              },
              {
                name: "成交量C",
                data: [100,80,95,150,112,132]
              }
            ]
          };
      this.drawLineCharts('gQrtPvDGEDMBSApittksuaXmQoQmrHtH', res);
    }, 500);
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
            series: [
              {
                data: [{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18},{"name":"五班","value":8}]
              }
            ]
          };
      this.drawPieCharts('MAHniJWxZMfofHOaomPVsPLZSUnTacMh', res);
    }, 500);
  }
  drawLineCharts = (id, data)=>{
    const { cWidth, cHeight, pixelRatio } = this.state;
    let ctx = Taro.createCanvasContext(id);
    uChartsLineInstance[id] = new uCharts({
      type: "line",
      context: ctx,
      width: cWidth,
      height: cHeight,
      categories: data.categories,
      series: data.series,
      pixelRatio: pixelRatio,
      animation: true,
      background: "#FFFFFF",
      color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
      padding: [15,10,0,15],
      enableScroll: false,
      legend: {},
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        gridType: "dash",
        dashLength: 2
      },
      extra: {
        line: {
          type: "straight",
          width: 2,
          activeType: "hollow"
        }
      }
    });
  }
  drawPieCharts = (id, data)=>{
    const { cWidth, cHeight, pixelRatio } = this.state;
    let ctx = Taro.createCanvasContext(id);
    uChartsPieInstance[id] = new uCharts({
      type: "pie",
      context: ctx,
      width: cWidth,
      height: cHeight,
      series: data.series,
      pixelRatio: pixelRatio,
      animation: true,
      background: "#FFFFFF",
      color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
      padding: [5,5,5,5],
      enableScroll: false,
      extra: {
        pie: {
          activeOpacity: 0.5,
          activeRadius: 10,
          offsetAngle: 0,
          labelWidth: 15,
          border: false,
          borderWidth: 3,
          borderColor: "#FFFFFF"
        }
      }
    });
  }
  lineTap = (e)=>{
    uChartsLineInstance[e.target.id].touchLegend(e);
    uChartsLineInstance[e.target.id].showToolTip(e);
  }  
  pieTap = (e)=>{
    uChartsPieInstance[e.target.id].touchLegend(e);
    uChartsPieInstance[e.target.id].showToolTip(e);
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    return (
       <View className='<%= pageName %>'>
        <View className='at-row at-row__justify--between'>
          <View className='at-col  at-col-6'> 
            <AtCard
              note='累计访问1111222'
              extra='今日'
              title='接口访问量'
              renderIcon={<AtIcon value='download-cloud' size='30' color='#F00'></AtIcon>}
            >
              111
            </AtCard>
          </View>
          <View className='at-col  at-col-6'>
            <AtCard
              note='外部接口总访问量222'
              extra='今日'
              title='外部接口访问量'
              renderIcon={<AtIcon value='external-link' size='30' color='#F00'></AtIcon>}
             >
              12
            </AtCard>
          </View>
        </View>
        <View className='at-row at-row__justify--between'>
          <View className='at-col  at-col-6'>
            <AtCard
              note=''
              extra=''
              title='接入系统'
              renderIcon={<AtIcon value='download' size='30' color='#F00'></AtIcon>}
            >
              222个
             </AtCard>
          </View>
          <View className='at-col  at-col-6'>
            <AtCard
              note=''
              extra=''
              title='API接口'
              renderIcon={<AtIcon value='playlist' size='30' color='#F00'></AtIcon>}
            >
              223个
            </AtCard>
          </View>
        </View>
         <Canvas
            // {...canvasProps}
            canvas-id="gQrtPvDGEDMBSApittksuaXmQoQmrHtH"
            id="gQrtPvDGEDMBSApittksuaXmQoQmrHtH"
            class="charts"
            onTouchEnd={this.lineTap}
          />
          <Canvas
            // {...canvasProps}
            canvas-id="MAHniJWxZMfofHOaomPVsPLZSUnTacMh"
            id="MAHniJWxZMfofHOaomPVsPLZSUnTacMh"
            class="charts"
            onTouchEnd={this.pieTap}
          />
          <AtTabBar
            fixed
            tabList={[
              { title: '工作台', iconType: 'analytics', text: 'new' },
              { title: '系统管理', iconType: 'settings' },
              { title: '我的', iconType: 'user', text: '100', max: 99 }
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />
       </View>
    )
  }
}
