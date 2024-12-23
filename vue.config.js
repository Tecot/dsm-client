/*
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-12-23 13:25:05
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service')
import config from '@/config'

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: config.baseUrl,
        changeOrigin: true, 
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
