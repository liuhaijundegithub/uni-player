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
  generateBottomProgress
} from './index';
import { formatTime } from './utils'

import { El, ToolConst } from '../../types/UniPlayer';

import bindBaseEvents from '../events/base';
import bindToolbarEvents, { toogleBarScale } from '../events/toolbar';

import { setTime, setBarPosition, initPlayerWrapperWidth } from './videoBehavior'

import { speed } from '../lib/config';



const render = (container: HTMLElement, config: UniPlayerConfig) => {


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
    loadingTimer: -1
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
    bottomProgress: generateBottomProgress()
  };

  el.videoEl.controls = false; // 关闭默认播放器控件
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


  el.videoEl.src = config.url;
  el.videoEl.onloadeddata = function (e) {
    const allTime = formatTime(el.videoEl.duration * 1000);
    // 插入总时间
    toolConst.duration = allTime;
    setTime(el, toolConst);

    // 得到播放器容器的宽度
    initPlayerWrapperWidth(el, toolConst)

    toolConst.videoTime = el.videoEl.duration;

    setBarPosition(el.bar, -7);
    toogleBarScale(el.bar, true);

    bindBaseEvents(el, toolConst);
    bindToolbarEvents(el, toolConst);
  }


  window.onresize = function () {
    initPlayerWrapperWidth(el , toolConst);
  }
  container.appendChild(el.videoWrapperEl);


  return {
    videoEl: el.videoEl
  }
}

export default render;