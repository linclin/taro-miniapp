import Taro  from '@tarojs/taro';
// import { useSelector, useDispatch } from '@tarojs/redux';
import { View } from '@tarojs/components';
import { AtTabBar } from 'taro-ui';
import type { RootState } from '../../store/index'
import { useSelector, useDispatch } from 'react-redux'
import { setTabBar } from '../../store/tabBar'; 
import './index.scss'
export default function TabBar() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.tabBar.currentTabBar);
  const handleClick= (value) => {
    dispatch(setTabBar(value))
    if (value === 0) {
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    }
    if (value === 1) {
      Taro.reLaunch({
        url: '/pages/system/index'
      })
    }
    if (value === 2) {
      Taro.reLaunch({
        url: '/pages/user/index'
      })
    }
  }
  return (
    <View>
      <AtTabBar
        fixed
        backgroundColor='#ececec'
        tabList={[
          { title: '工作台', iconType: 'analytics', text: 'new' },
          { title: '系统管理', iconType: 'settings', text: 'new' },
          { title: '我的', iconType: 'user', text: 'new', max: 99 }
        ]}
        onClick={handleClick.bind(this)}
        current={current}
      />
    </View>
  )
}