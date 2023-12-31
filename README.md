# uni-player

### 安装
```cmd
yarn add uni-player
or
npm i uni-player
```
### 使用
```js
const player = new UniPlayer({
  container: 'html element',
  url: 'video link address'
})
```
#### 详细配置(UniPlayerConfig)
|参数|类型|描述|
|:--------|:-------|:--------|
|container|string|css selector 播放器容器元素|
| url|string or Array<{ sources: string; tag: string; [active]: boolean }>|视频地址，可以是数组 , active为选中当前播放的视频源，如未设置则为list中的第一个|
|startTime|number|从何时开始播放（秒）|
|autoplay|boolean|是否自动播放，关于 autoplay 属性设置问题请[参考](https://developer.chrome.com/blog/autoplay)|
|isHls|boolean|是否为hls视频|
|Hls|Hls|如果 `isHls` 为 `true`，该属性必传（hls.js）|
|isFlv|boolean|是否为flv视频|
|Flv|Flv|如果 `isFlv` 为 `true`，该属性必传（flv.js）|
|live|boolean|是否是直播模式|
|theme|string|主题颜色|

### 方法
|名称|描述|
|:-------|:--------|
|player.play()|播放视频|
|player.pause()|暂停播放|
|player.requestFullScreen()|全屏播放|
|player.cancelFullScreen()|取消全屏播放|
|player.skipTo(time: `number`)|跳转至指定时间|
|player.setVolume(value: `number`)|设置音量（0-100）|
|player.destory()|销毁播放器|
|player.reload(config: `Partial<UniPlayerConfig>`)|重新加载播放器|

### 事件
```js
player.on('eventName', function (...args) {})
```

|名称|参数|描述|
|:----|:----|:-----|
|ready|无|播放器创建完成时调用|
|playStateChange|(isPlay: boolean)|播放状态变化回调|
|fullScreenStateChange|(isFullScreen: boolean)|全屏状态变化|
|playing|无|播放中触发|
|waiting|无|视频等待中触发|
|destroyed|无|播放器被摧毁后触发|
|finished|无|视频播放完成触发|
|error|无|视频播放错误|