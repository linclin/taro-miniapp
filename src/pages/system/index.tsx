import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { AtGrid, AtDivider } from "taro-ui"
import TabBar from '../../component/TabBar';
import './index.scss'

export default class System extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  private handleClick = (value, index): void => {
    Taro.navigateTo({
      url: value.url,
    })
  }
  render () {
    return (
      <View className='<%= pageName %>'>
        <AtDivider content='权限管理' />
        <AtGrid onClick={this.handleClick} data={
          [
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'settings'},
              value: '外部调用系统',
              url: '/pages/system/sys_system/index'
            },
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'user'},
              value: '用户角色权限',
              url: '/pages/system/sys_role/index'
            },
          ]
        } />
        <AtDivider content='系统日志' />
        <AtGrid onClick={this.handleClick} data={
          [
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'download-cloud'},
              value: '接口访问日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'external-link'},
              value: '外部接口日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'numbered-list'},
              value: '数据变更日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'clock'},
              value: '定时任务日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#6190E8', value: 'bullet-list'},
              value: '系统接口路由',
              url: '支持自定义字段'
            },
          ]
        } />
        <TabBar />
      </View>
    )
  }
}
