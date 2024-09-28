import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TabBarState {
  currentTabBar: number
}

const initialState: TabBarState = {
  currentTabBar: 0,
}
// 1.使用createSlice方法创建一个slice。每一个slice里面包含了reducer和actions
export const tabBarSlice = createSlice({
    // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
    name: 'tabBar',
    // state数据的初始值
    initialState,
    // 定义的action-赋值的方式进行数据的改变
    reducers: {
      setTabBar: (state, action: PayloadAction<number>) => {
        state.currentTabBar = action.payload;
      },
    },
});
// Action creators are generated for each case reducer function
export const { setTabBar } = tabBarSlice.actions;
export default tabBarSlice.reducer;
