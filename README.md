
# movie


> 电影预告网

## 项目启动

### MongoDB安装
[官方文档](https://docs.mongodb.com)
#### 启动mongodb
```bash
cd /usr/local/mongodb/bin
./mongod
```
### 启动后端服务
```bash
cd 项目文件夹
cd server
node app.js
首次启动app时，先require('./task/nowplaying')放开，爬取数据并保存到数据库
数据库有原始数据后，可以再注视require，并node app.js
```

### 启动前端项目
```bash
cd koaMovie
npm run dev

```
