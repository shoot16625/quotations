module.exports = {
  devServer: {
    // CORSエラー回避
    proxy: {
      '/api/': {
        target: 'https://meigen.doodlenote.net'
      }
    }
  }
}
