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
  generateProgress,
  generateFullProgress,
  generateBar,
  setBarPosition,
  toogleBarScale,
  generatePlayedProgress,
  generateBufferProgress
} from './index';
import { elIsFullScreen } from './is';
import { checkIn } from './utils';

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

let playerWidth = 0;

let isMouseMoving = false;

let playerClientLeft = 0;

let maxRange = 0; // 可以滑动的最大宽度

let videoTime = 0;


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
  const progressFull = generateFullProgress();
  const progresPlayed = generatePlayedProgress();
  const progresBuffer = generateBufferProgress();
  const bar = generateBar();
  progress.appendChild(progressFull);
  progress.appendChild(progresPlayed);
  progress.appendChild(progresBuffer);
  progress.appendChild(bar);

  toolbarEl.appendChild(toolbarElLeft);
  toolbarEl.appendChild(toolbarElRight);
  toolbarEl.appendChild(progress);

  toolbarEl.onclick = e => e.stopPropagation();

  const playBtn = generatePlayBtn();
  progress.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isMouseMoving) return false;
    const x = e.clientX;
    const position = x - playerClientLeft - 10 - 12;
    setBarPosition(bar, position, videoEl, maxRange, videoTime);
    toogleBarScale(bar, false);
    setPlayedProgress(position);
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
    if (isMouseMoving) return false;
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

  // 监听鼠标拖动bar
  bar.onmousedown = function (e) {
    e.stopPropagation();
    const currentTranslateX = getComputedStyle(bar).transform;
    isMouseMoving = true;
    let originX = e.clientX // 鼠标相对于视窗左边的长度
      - 10 // toolbar 左padding
      - parseInt(currentTranslateX.split(',')[4]) // 当前的translateX
      + 7; // bar的宽度的一半。让中心在起点
    const x = e.clientX;
    const position = x - playerClientLeft - 10 - 12;
    setBarPosition(bar, position);
    // 滑块可以移动的范围
    const range = {
      min: -7,
      max: maxRange
    }
    document.onmousemove = function (mouseEvent) {
      let newLeft = mouseEvent.clientX - originX;
      // 边界处理
      if (newLeft < range.min) newLeft = range.min;
      if (newLeft > range.max) newLeft = range.max;
      requestAnimationFrame(() => {
        bar.style.transform = `translateX(${newLeft}px)`;
        setPlayedProgress(newLeft);
      })
    }
  }

  progress.addEventListener('mouseenter', function () {
    toogleBarScale(bar, false, true);
  });
  progress.addEventListener('mouseleave', function () {
    toogleBarScale(bar, true, true);
  });

  document.onmouseup = function (e) {
    document.onmousemove = null;
    setTimeout(() => {
      isMouseMoving = false;
    }, 300)
    e.stopPropagation();
    const currentTranslateX = getComputedStyle(bar).transform;
    const x = parseInt(currentTranslateX.split(',')[4]);
    setBarPosition(bar, x, videoEl, maxRange, videoTime);
    if (!checkIn(progress)) {
      toogleBarScale(bar, true);
    } 
  }

  allEls.append(videoEl)
  allEls.append(toolbarEl)

  videoWrapperEl.appendChild(allEls);
  videoEl.src = config.url;
  videoEl.onloadeddata = function (e) {
    const allTime = formatTime(videoEl.duration * 1000);
    // 插入总时间
    duration = allTime;
    setTime();

    // 得到播放器容器的宽度
    initPlayerWrapperWidth()
    maxRange = playerWidth - 20 - 21;
    videoTime = videoEl.duration;

    setBarPosition(bar, -7);
    toogleBarScale(bar, true);
  }

  videoEl.addEventListener('timeupdate', function (e: any) {
    const currentTime = videoEl.currentTime;
    const x = maxRange * (currentTime / videoTime);
    if (!isMouseMoving) {
      setBarPosition(bar, x);
      setPlayedProgress(x);
    }
    setTime();
  })

  videoEl.addEventListener('progress', function (e: any) {
    // 记载出缓存的时间
    try {
      const bufferTime = e.currentTarget.buffered.end(0)
      const right = (bufferTime / videoTime) * maxRange;
      console.log(maxRange - right);
      progresBuffer.style.right = (maxRange - right) + 'px';
    } catch {
      progresBuffer.style.right = maxRange + 'px';
    }
  });

  function initPlayerWrapperWidth () {
    const pWidth = videoWrapperEl.clientWidth;
    playerWidth = pWidth;
    playerClientLeft = videoWrapperEl.getBoundingClientRect().left;
  }

  window.onresize = function () {
    initPlayerWrapperWidth();
  }
  el.appendChild(videoWrapperEl);


  function setPlayedProgress (x: number) {
    const right = maxRange - x;
    progresPlayed.style.right = right + 'px';
  }
  return {
    videoEl
  }
}

export default render;