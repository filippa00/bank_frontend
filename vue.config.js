const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

    devServer: {
      // proxy: 'https://cgbank-production.up.railway.app:443',
      proxy: 'http://localhost:8080/',
      }
  
})
