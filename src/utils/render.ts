import { UniPlayerConfig } from '../../types/UniPlayer';
import {
  string2HtmlNode,
  generatePlayBtn,
  generatePauseBtn,
  generateToolbarLeftWrapper,
  generateToolbarRightWrapper,
  generateBigPauseIcon,
  formatTime,
  generateTime,
  generateProgress
} from './index';
import { elIsFullScreen } from './is';

const videoWrapperString = '<div class="uni-player-wrapper"></div>';

function fullScreen (el: HTMLElement) {
  if (elIsFullScreen()) {
    document.exitFullscreen();
  } else {
    el.requestFullscreen();
  }
}

function generateToolbar () {
  const toolBarWrapperString = '<div class="uni-player-toolbar"></div>"'
  return string2HtmlNode(toolBarWrapperString);
};

let duration = '';


const render = (el: HTMLElement, config: UniPlayerConfig) => {
  el.classList.add('uni-player');
  const videoEl = string2HtmlNode('<video></video>') as HTMLVideoElement;
  videoEl.controls = false;

  const allEls = document.createDocumentFragment();

  const videoWrapperEl = string2HtmlNode(videoWrapperString);

  const pausedIcon = generateBigPauseIcon();
  allEls.append(pausedIcon);

  const toolbarEl = generateToolbar(); // toolbar wrapper
  const toolbarElLeft = generateToolbarLeftWrapper();
  const toolbarElRight = generateToolbarRightWrapper();
  const progress = generateProgress();
  toolbarEl.appendChild(toolbarElLeft);
  toolbarEl.appendChild(toolbarElRight);
  toolbarEl.appendChild(progress);

  const playBtn = generatePlayBtn();
  toolbarEl.addEventListener('click', function (e) {
    e.stopPropagation();
  })
  playBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    videoEl.play();
  })
  const pauseBtn = generatePauseBtn();
  pauseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    videoEl.pause();
  })

  // 播放时间
  const timeEl = generateTime();

  toolbarElLeft.appendChild(playBtn);
  toolbarElLeft.appendChild(pauseBtn);
  toolbarElLeft.appendChild(timeEl);


  allEls.append(toolbarEl);

  videoEl.onplay = () => {
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
    pausedIcon.classList.add('hide');
  }
  videoEl.onpause = () => {
    pauseBtn.classList.add('hide');
    playBtn.classList.remove('hide');
    pausedIcon.classList.remove('hide');
  }

  let clickTimer: NodeJS.Timer;
  let toolBarTimer: NodeJS.Timer;

  function setVideoPlay () {
    videoEl.play();
  }
  function setVideoPause () {
    videoEl.pause();
  }

  function setTime () {
    const currentTime = formatTime(videoEl.currentTime * 1000);
    const html = currentTime.padStart(duration.length, '00:') + '<span class="dash">/</span>' + duration;
    timeEl.innerHTML = html;
  }

  function toolbarFadeOutAndHide () {
    toolbarEl.classList.add('fadeOut');
    toolbarEl.onanimationend = function () {
      toolbarEl.classList.remove('show');
      toolbarEl.classList.remove('fadeOut');
      toolbarEl.onanimationend = null;
    }
  }

  function delayHideToolbar () {
    toolBarTimer = setTimeout(() => {
      toolbarFadeOutAndHide();
    }, 2000)
  }
  // 绑定全屏事件
  videoWrapperEl.addEventListener('dblclick', function () {
    clearTimeout(clickTimer);
    fullScreen(videoWrapperEl);
  });

  // 绑定 点击暂停/播放事件
  videoWrapperEl.addEventListener('click', function (e) {
    e.stopPropagation();
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      const paused = videoEl.paused;
      if (paused) setVideoPlay()
      else setVideoPause();
    }, 300);
  });

  // 鼠标移入 移出
  videoWrapperEl.addEventListener('mouseenter', function () {
    toolbarEl.classList.add('show');
    delayHideToolbar()
  });

  videoWrapperEl.addEventListener('mouseleave', function () {
    toolbarFadeOutAndHide();
    clearTimeout(toolBarTimer);
  })

  // 鼠标移动
  videoWrapperEl.addEventListener('mousemove', function () {
    // 鼠标一动 就开始重新计时
    clearTimeout(toolBarTimer);
    toolbarEl.classList.add('show');
    delayHideToolbar()
  })

  allEls.append(videoEl)
  allEls.append(toolbarEl)

  videoWrapperEl.appendChild(allEls);
  videoEl.src = config.url;
  videoEl.oncanplay = function (e) {
    const allTime = formatTime(videoEl.duration * 1000);
    // 插入总时间
    duration = allTime;
    setTime();
  }

  videoEl.addEventListener('timeupdate', function (e: any) {
    setTime();
  })

  videoEl.addEventListener('progress', function (e: any) {
    // 记载出缓存的时间
    console.log(e.currentTarget.buffered.end(0));
  });
  el.appendChild(videoWrapperEl);
  return {
    videoEl
  }
}

export default render;