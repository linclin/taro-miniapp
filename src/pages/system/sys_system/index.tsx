import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtPagination,AtInput,AtFloatLayout} from "taro-ui"
import dayjs from 'dayjs';
import httpRequest from '../../../utils/http-request';
import TabBar from '../../../component/TabBar';
import './index.scss'

export default class SysSystem extends Component<PropsWithChildren> {
  constructor (props) {
    super(props)
    this.state = {
      pageCurrent: 1,
      pageSize: 1,
      systemData: [],
      pageTotal: 0,
      detailOpen: false
    }
  }
  componentDidMount () { 
    this.requestSystemlist(this.state.pageCurrent, this.state.pageSize);
  }
  requestSystemlist = async (offset,limit) => {  
    const res = await httpRequest.post('/api/v1/system/list', {offset: (offset- 1) * limit ,limit: limit})
    if (!res.success){
      Taro.showToast({
        title: res.msg,
        icon: 'none'
      })
    }else{
      this.setState({systemData: res.data });
      this.setState({pageTotal: res.total });
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  private handleClick = (value): void => {
    this.setState({detailOpen: true });
  }
  private handlePageChange = (type): void => {
    this.setState({pageCurrent: type.current });
    this.requestSystemlist(type.current, this.state.pageSize);
  }
  private handleClose = (value): void => {
    this.setState({detailOpen: false });
  }
  render () {
    const { pageCurrent,pageSize,systemData,pageTotal,detailOpen } = this.state;
    return (
      <View className='<%= pageName %>'>
        <AtList> 
          {systemData && systemData.map((item) => (
            <AtListItem
              key={item.ID}
              // arrow='right'
              note={dayjs(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}
              title={item.AppId}
              extraText={item.SystemName}
              onClick={this.handleClick}
            >
              <AtFloatLayout key={item.ID} isOpened={detailOpen}  title={item.SystemName} onClose={this.handleClose.bind(this)}>
                这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
                随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
              </AtFloatLayout>
            </AtListItem>
          ))}
        </AtList>
        <AtPagination 
          icon 
          total={pageTotal} 
          pageSize={pageSize}
          current={pageCurrent}
          onPageChange={this.handlePageChange}
        >
        </AtPagination>
        <TabBar />
      </View>
    )
  }
}
