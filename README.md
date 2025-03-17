# node

v18.20.2

# Bootstrap

https://v5.bootcss.com/
https://fontawesome.com/search?o=r&m=free
https://www.bootstrapmb.com/item/207/preview

# 打包方式

- 打包: npm run make

# Other

- 如果 Electron 相关下载失败尝试设置如下源
  ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
  ELECTRON_BUILDER_BINARIES_MIRROR=http://npmmirror.com/mirrors/electron-builder-binaries/
  registry=http://registry.npmmirror.com

- 解压 asar
  asar extract app.asar ./app
