import { UniPlayerConfig } from '../../types/UniPlayer';
import {
  generatePlayBtn,
  generatePauseBtn,
  generateToolbarLeftWrapper,
  generateToolbarRightWrapper,
  generateBigPauseIcon,
  generateTime,
  generateProgress,
  generateFullProgress,
  generateBar,
  generatePlayedProgress,
  generateBufferProgress,
  generateVideoEl,
  generateToolbar,
  generateVideoWrapperEl,
  generateTimeTip,
  generateFullScreenEnterIcon,
  generateFullScreenExitIcon,
  generateSpeedPlay,
  generateLoading,
  generateVoice,
  generateBottomProgress,
  generateVideoSources,
  generateLiveTag
} from './index';
import { formatTime } from './utils'

import { El, ToolConst, UniCallBack } from '../../types/UniPlayer';

import bindBaseEvents from '../events/base';
import bindToolbarEvents, { toogleBarScale } from '../events/toolbar';
import bindError from '../events/error';
import bindShortcuts from '../events/shortcuts';

import { setTime, setBarPosition, initPlayerWrapperWidth } from './videoBehavior'

import { speed } from '../lib/config';



const render = (container: HTMLElement, config: UniPlayerConfig, callbacks: UniCallBack) => {


  const toolConst: ToolConst = {
    duration: '',
    playerWidth: 0,
    isMouseMoving: false,
    playerClientLeft: 0,
    maxRange: 0, // 可以滑动的最大宽度
    videoTime: 0,
    clickTimer: -1,
    toolBarTimer: -1,
    speed: 1,
    isMouseDown: false,
    loadingTimer: -1,
    eventBinded: false
  };
  container.classList.add('uni-player');

  const el: El = {
    allEls: document.createDocumentFragment(),
    videoEl:  generateVideoEl(),
    videoWrapperEl: generateVideoWrapperEl(),
    pausedIcon: generateBigPauseIcon(),
    toolbarEl: generateToolbar(),
    toolbarElLeft: generateToolbarLeftWrapper(),
    toolbarElRight: generateToolbarRightWrapper(),
    progress: generateProgress(),
    progressFull: generateFullProgress(),
    progresPlayed: generatePlayedProgress(),
    progresBuffer: generateBufferProgress(),
    pauseBtn: generatePauseBtn(),
    playBtn: generatePlayBtn(),
    bar: generateBar(),
    timeEl: generateTime(), // 播放时间
    timeTip: generateTimeTip(),
    fullScreenEntry: generateFullScreenEnterIcon(),
    fullScreenExit: generateFullScreenExitIcon(),
    speedPlay: generateSpeedPlay(speed),
    loadingEl: generateLoading(),
    voice: generateVoice(),
    bottomProgress: generateBottomProgress(),
    liveTag: generateLiveTag()
  };
  el.videoEl.controls = false; // 关闭默认播放器控件

  if (config.live) {
    el.toolbarElLeft.appendChild(el.playBtn);
    el.toolbarElLeft.appendChild(el.pauseBtn);
    el.toolbarElLeft.appendChild(el.liveTag);
    el.toolbarEl.appendChild(el.toolbarElLeft);
    el.toolbarEl.appendChild(el.toolbarElRight);
    el.toolbarElRight.appendChild(el.voice);
    el.toolbarElRight.appendChild(el.fullScreenEntry);
    el.toolbarElRight.appendChild(el.fullScreenExit);
    el.allEls.append(el.pausedIcon);
    el.allEls.append(el.toolbarEl);
    el.allEls.append(el.videoEl);
    el.allEls.append(el.loadingEl)
    el.videoWrapperEl.appendChild(el.allEls);
  } else {
    el.allEls.append(el.pausedIcon);
    el.progress.appendChild(el.progressFull);
    el.progress.appendChild(el.progresPlayed);
    el.progress.appendChild(el.progresBuffer);
    el.progress.appendChild(el.bar);
    el.progress.appendChild(el.timeTip);
    el.toolbarEl.appendChild(el.toolbarElLeft);
    el.toolbarEl.appendChild(el.toolbarElRight);
    el.toolbarEl.appendChild(el.progress);
    el.toolbarElLeft.appendChild(el.playBtn);
    el.toolbarElLeft.appendChild(el.pauseBtn);
    el.toolbarElLeft.appendChild(el.timeEl);

    el.toolbarElRight.appendChild(el.speedPlay);
    el.toolbarElRight.appendChild(el.voice);
    el.toolbarElRight.appendChild(el.fullScreenEntry);
    el.toolbarElRight.appendChild(el.fullScreenExit);


    el.allEls.append(el.toolbarEl);
    el.allEls.append(el.bottomProgress);
    el.allEls.append(el.videoEl)
    el.allEls.append(el.loadingEl)
    el.videoWrapperEl.appendChild(el.allEls);
  }



  bindError(el, toolConst, config, callbacks);
  if (typeof config.url === 'string') {
    if (config.isHls) {
      if (config.Hls.isSupported()) {
        toolConst.hls = new config.Hls({ maxBufferHole: 10, maxSeekHole: 10 });
        toolConst.hls.loadSource(config.url);
        toolConst.hls.attachMedia(el.videoEl);
        toolConst.videoAddress = config.url;
        toolConst.hls.on(config.Hls.Events.MANIFEST_PARSED, function (event, data) {
          if (data.levels.length === 1) {
            toolConst.hls.startLevel = -1;
          } else {
            const sources = data.levels.map((i, index) => ({
              tag: `${i.height}P`,
              source: index
            }));
            config.url = sources;
            sources.push({ tag: '自动', source: -1, active: true });
            el.videoSources = generateVideoSources(sources);
            el.toolbarElRight.insertBefore(el.videoSources, el.toolbarElRight.childNodes[0]);
            toolConst.hls.startLevel = -1;
          }
        });
      }
    } else if (config.isFlv) {
      // flv视频
      const Flv = config.Flv;
      if (Flv.isSupported()) {
        const flvPlayer = Flv.createPlayer({
          type: 'flv',
          url: config.url
        });
        flvPlayer.attachMediaElement(el.videoEl);
        flvPlayer.load();
      }
    } else {
      // 不需要hls或者flv处理
      el.videoEl.src = config.url;
    }
  } else {
    const s = config.url.find(i => i.active);
    // 渲染视频源
    el.videoSources = generateVideoSources(config.url);
    el.toolbarElRight.insertBefore(el.videoSources, el.toolbarElRight.childNodes[0])
    if (s) {
      el.videoEl.src = s.source;
    } else {
      el.videoEl.src = config.url[0].source;
    }
  }
  el.videoEl.autoplay = Boolean(config.autoPlay);
  toolConst.loadingTimer = setTimeout(() => {
    el.loadingEl.classList.remove('hide');
  }, 1000);
  el.videoEl.onloadeddata = function (e) {
    if (toolConst.eventBinded) return false;
    const allTime = formatTime(el.videoEl.duration);
    // 插入总时间
    toolConst.duration = allTime;
    setTime(el, toolConst);

    // 得到播放器容器的宽度
    initPlayerWrapperWidth(el, toolConst)

    toolConst.videoTime = el.videoEl.duration;

    setBarPosition(el.bar, -7);
    toogleBarScale(el.bar, true);

    bindBaseEvents(el, toolConst, config, callbacks);
    bindToolbarEvents(el, toolConst, config, callbacks);
    bindShortcuts(el, toolConst, config, callbacks);


    // 如果指定了开始播放的时间以及自动播放
    if (config.autoPlay && config.startTime) {
      el.videoEl.currentTime = config.startTime;
      el.videoEl.play();
    }
    toolConst.eventBinded = true;
  }


  window.onresize = function () {
    initPlayerWrapperWidth(el , toolConst);
  }
  container.appendChild(el.videoWrapperEl);

  // 触发 ready事件
  setTimeout(() => {
    const onReady = callbacks.get('ready');
    onReady && onReady();
  });

  return {
    el
  }
}

export default render;