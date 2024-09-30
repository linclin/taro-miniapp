import { Component, PropsWithChildren } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components'
import { AtCard, AtIcon, AtDivider} from 'taro-ui';
import uCharts from '../../sdk/u-charts.min.js';
import dayjs from 'dayjs';
import httpRequest from '../../utils/http-request';
import TabBar from '../../component/TabBar';
import './index.scss'
var uChartsLineInstance = {};
var uChartsPieInstance = {};
export default class Index extends Component<PropsWithChildren> {
  constructor (props) {
    super(props)
    this.state = {
      today:"",
      cWidth: 750,
      cHeight: 500,
      pixelRatio: 1,
      sysdata:{},
    }
  }
  componentDidMount () {
    const today = dayjs().format('MM-DD');
    this.setState({today:today})
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
  getServerData = async () => {  
    let lineCategories = [];
    let lineSeriesData = [];
    let pieSeriesData = [];
    const res = await httpRequest.get('/api/v1/data/list');
    if (!res.success){
      Taro.showToast({
        title: res.msg,
        icon: 'none'
      })
    }else{
      this.setState({sysdata: res.data });
      res.data.WeekApiCount.forEach(item => {
        lineCategories.push(dayjs(item.Date).format('MM-DD'));
        lineSeriesData.push(item.Count); 
      })
      this.setState({lineCategories: lineCategories });
      this.setState({lineSeriesData: lineSeriesData });
      res.data.WeekClientApiCount.forEach(item => {
        pieSeriesData.push({"name":item.ClientIP,"value":item.Count});
      })
      this.setState({pieSeriesData: pieSeriesData }); 
    }
    let lineRes = {
      categories: lineCategories,
      series: [
        {
          name: "访问量",
          data:  lineSeriesData
        }
      ]
    };
    this.drawLineCharts('WeekApiCountLine', lineRes);
    let pieRes = {
      series: [
        {
          data: pieSeriesData
        }
      ]
    };
    this.drawPieCharts('WeekClientApiCountPie', pieRes);
  }
  drawLineCharts = (id, data)=>{
    const { cWidth, cHeight, pixelRatio } = this.state;
    const query = Taro.createSelectorQuery();
    query.select('#' + id).fields({ node: true, size: true }).exec(res => {
      if (res[0]) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        canvas.width = res[0].width * pixelRatio;
        canvas.height = res[0].height * pixelRatio;
        uChartsLineInstance[id] = new uCharts({
          type: "line",
          context: ctx,
          width: cWidth * pixelRatio,
          height: cHeight * pixelRatio,
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
      }else{
        console.error("[uCharts]: 未获取到 context");
      }
    });
  }
  drawPieCharts = (id, data)=>{
    const { cWidth, cHeight, pixelRatio } = this.state;
    const query = Taro.createSelectorQuery();
    query.select('#' + id).fields({ node: true, size: true }).exec(res => {
      if (res[0]) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        canvas.width = res[0].width * pixelRatio;
        canvas.height = res[0].height * pixelRatio;
        uChartsPieInstance[id] = new uCharts({
          type: "pie",
          context: ctx,
          width: cWidth * pixelRatio,
          height: cHeight * pixelRatio,
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
      }else{
        console.error("[uCharts]: 未获取到 context");
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
  render () {
    const { cWidth, cHeight } = this.state;
    const canvasProps = { style: { width: cWidth, height: cHeight } };
    return (
       <View className='<%= pageName %>'>
        <View className='at-row at-row__justify--between'>
          <View className='at-col  at-col-6'> 
            <AtCard
              note={'访问总量 ' + this.state.sysdata.AllApiCount}
              extra={this.state.today}
              title='接口访问'
              renderIcon={<AtIcon value='download-cloud'></AtIcon>}
            >
              {this.state.sysdata.ApiCount}
            </AtCard>
          </View>
          <View className='at-col  at-col-6'>
            <AtCard
              note={'访问总量 ' + this.state.sysdata.AllReqApiCount }
              extra={this.state.today}
              title='外部访问'
              renderIcon={<AtIcon value='external-link'></AtIcon>}
             >
              {this.state.sysdata.ReqApiCount}
            </AtCard>
          </View>
        </View>
        <View className='at-row at-row__justify--between'>
          <View className='at-col  at-col-6'>
            <AtCard
              note=''
              extra=''
              title='接入系统'
              renderIcon={<AtIcon value='download'></AtIcon>}
            >
              {this.state.sysdata.SystemCount}个
             </AtCard>
          </View>
          <View className='at-col  at-col-6'>
            <AtCard
              note=''
              extra=''
              title='API接口'
              renderIcon={<AtIcon value='playlist'></AtIcon>}
            >
              {this.state.sysdata.RouterCount}个
            </AtCard>
          </View>
        </View>
        <AtDivider content='系统接口请求趋势(最近7天)' />
        <Canvas
            {...canvasProps}
            canvas-id="WeekApiCountLine"
            id="WeekApiCountLine"
            type="2d"
            class="charts"
            onTouchEnd={this.lineTap}
        />
        <AtDivider content='客户端访问接口情况(最近7天)' />
        <Canvas
            {...canvasProps}
            canvas-id="WeekClientApiCountPie"
            id="WeekClientApiCountPie"
            type="2d"
            class="charts"
            onTouchEnd={this.pieTap}
        />
        <TabBar />
       </View>
    )
  }
}
