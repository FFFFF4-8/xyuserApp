module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: (loader) => [
          require('postcss-aspect-ratio-mini')({}),
          require('postcss-write-svg')({ utf8: false }),
          require('postcss-px-to-viewport')({
            viewportWidth: 750, // (Number) 设计稿的视口宽度
            unitPrecision: 3, // (Number) 单位转换后保留的精度
            viewportUnit: 'vw', // (String) 希望使用的视口单位.
            fontViewportUnit: 'vw', // 字体使用的视口单位
            propList: ['*'], // 能转化为vw的属性列表
            selectorBlackList: [], // (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
            minPixelValue: 1, // (Number)  设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // (Boolean)  媒体查询里的单位是否需要转换单位.
            replace: true, // (Boolean) 是否直接更换属性值，而不添加备用属性
            exclude: [], //  (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            landscape: false, // (Boolean) 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // (String) 横屏时使用的单位
            landscapeWidth: 568 //  (Number) 横屏时使用的视口宽度
          }),
          require('postcss-viewport-units')({})
        ]
      }
    }
  }
}
