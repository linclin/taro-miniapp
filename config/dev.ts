import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
  // plugins: ['@tarojs/plugin-react-devtools'],
  cache: {
    enable: false
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport<'webpack5'>
