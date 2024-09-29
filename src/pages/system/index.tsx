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
    Taro.showModal({
      title: '提示',
      content: `Value: ${JSON.stringify(value)}, Index: ${index}`,
      showCancel: false
    })
  }
  render () {
    return (
      <View className='<%= pageName %>'>
        <AtDivider content='权限管理' />
        <AtGrid onClick={this.handleClick} data={
          [
            {
              iconInfo: { size: 30,  color: '#F00', value: 'settings'},
              value: '系统管理',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#F00', value: 'user'},
              value: '角色管理',
              url: '支持自定义字段'
            },
          ]
        } />
        <AtDivider content='系统日志' />
        <AtGrid onClick={this.handleClick} data={
          [
            {
              iconInfo: { size: 30,  color: '#F00', value: 'download-cloud'},
              value: '接口访问日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#F00', value: 'external-link'},
              value: '外部接口日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#F00', value: 'numbered-list'},
              value: '数据变更日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#F00', value: 'clock'},
              value: '定时任务日志',
              url: '支持自定义字段'
            },
            {
              iconInfo: { size: 30,  color: '#F00', value: 'bullet-list'},
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
