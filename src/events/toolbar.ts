import { El, ToolConst, UniPlayerConfig, Sources } from '../../types/UniPlayer';
import {
  setBarPosition,
  setPlayedProgress
} from '../utils/videoBehavior';

import { checkIfPointerInside, formatTime } from '../utils/utils';

import layer from '../utils/layer';


export const toogleBarScale = (bar: HTMLElement, hide: boolean, transtion = false) => {
  let transforms = bar.style.transform.split(' ');
  transforms = transforms.filter(i => i !== `scale(${hide ? 1 : 0})` && Boolean(i));
  transforms.push(`scale(${hide ? 0 : 1})`);
  bar.style.transform = transforms.join(' ');
}

export default function bindToolbarEvents (el: El, toolConst: ToolConst, config: UniPlayerConfig) {

  const volumeBar = document.querySelector('.uni-player-wrapper .volume-bar-progress .bar') as HTMLElement;
  const volumeProgressActive = document.querySelector('.uni-player-wrapper .volume-bar-progress .volume-bar-progress-active') as HTMLElement;
  const volumePopover = document.querySelector('.uni-player-wrapper .uni-voice .uni-player-popover') as HTMLElement;
  const volumeValue = document.querySelector('.uni-player-wrapper .uni-voice .uni-player-popover .volume-value') as HTMLElement;
  const mute = document.querySelector('.uni-player-wrapper .uni-voice .mute') as HTMLElement;
  const volume = document.querySelector('.uni-player-wrapper .uni-voice .volume') as HTMLElement;

  el.toolbarEl.onclick = e => e.stopPropagation();
  el.toolbarEl.onmouseenter = e => {
    e.stopPropagation();
    clearTimeout(toolConst.toolBarTimer);
  }

  // 点击进度条定位时间
  el.progress.addEventListener('click', function (e) {
    e.stopPropagation();
  })


  // 监听鼠标拖动bar
  el.bar.onmousedown = function (e) {
    e.stopPropagation();
    const currentTranslateX = getComputedStyle(el.bar).transform;
    toolConst.isMouseMoving = true;
    let originX = e.clientX // 鼠标相对于视窗左边的长度
      - 10 // toolbar 左padding
      - parseInt(currentTranslateX.split(',')[4]) // 当前的translateX
      + 7; // bar的宽度的一半。让中心在起点
    const x = e.clientX;
    const position = x - toolConst.playerClientLeft - 10 - 12;
    setBarPosition(el.bar, position);
    // 滑块可以移动的范围
    const range = {
      min: -7,
      max: toolConst.maxRange
    }
    document.onmousemove = function (mouseEvent) {
      let newLeft = mouseEvent.clientX - originX;
      // 边界处理
      if (newLeft < range.min) newLeft = range.min;
      if (newLeft > range.max) newLeft = range.max;
      requestAnimationFrame(() => {
        el.bar.style.transform = `translateX(${newLeft}px)`;
        setPlayedProgress(el, toolConst, newLeft);
      })
    }
  }

  el.progress.addEventListener('mouseenter', function () {
    toogleBarScale(el.bar, false, true);
    el.timeTip.style.display = 'block';
  });
  el.progress.addEventListener('mouseleave', function () {
    toogleBarScale(el.bar, true, true);
    el.timeTip.style.display = 'none';
  });


  el.progress.addEventListener('mousedown', function (e) {
    if (toolConst.isMouseMoving) return false;
    toolConst.isMouseDown = true;
    const x = e.clientX;
    const position = x - toolConst.playerClientLeft - 10 - 12;
    setBarPosition(el.bar, position);
    toogleBarScale(el.bar, false);
    setPlayedProgress(el, toolConst, position);

    const currentTranslateX = getComputedStyle(el.bar).transform;
    toolConst.isMouseMoving = true;
    let originX = e.clientX // 鼠标相对于视窗左边的长度
      - 10 // toolbar 左padding
      - parseInt(currentTranslateX.split(',')[4]) // 当前的translateX
      + 7; // bar的宽度的一半。让中心在起点
    setBarPosition(el.bar, position);
    // 滑块可以移动的范围
    const range = {
      min: -7,
      max: toolConst.maxRange
    }
    document.onmousemove = function (mouseEvent) {
      let newLeft = mouseEvent.clientX - originX;
      // 边界处理
      if (newLeft < range.min) newLeft = range.min;
      if (newLeft > range.max) newLeft = range.max;
      requestAnimationFrame(() => {
        el.bar.style.transform = `translateX(${newLeft}px)`;
        setPlayedProgress(el, toolConst, newLeft);
      })
    }
  });

  document.onmouseup = function (e) {
    document.onmousemove = null;
    volumePopover.classList.remove('block');
    setTimeout(() => {
      toolConst.isMouseMoving = false;
      toolConst.isMouseDown = false;
      document.onmousemove = null;
    }, 300)
    e.stopPropagation();
    const currentTranslateX = getComputedStyle(el.bar).transform;
    const x = parseInt(currentTranslateX.split(',')[4]);
    setBarPosition(el.bar, x, el.videoEl, toolConst.maxRange, toolConst.videoTime);
    if (!checkIfPointerInside(el.progress)) {
      toogleBarScale(el.bar, true);
    }
  }


  // 鼠标悬浮进度条显示 时间
  el.progress.addEventListener('mousemove', (e) => requestAnimationFrame(() => {
    e.stopPropagation();
    const x = e.clientX;
    const position = x - toolConst.playerClientLeft - 10 - 12;
    const pointerTime = toolConst.videoTime * (position / toolConst.maxRange);
    const currentTime = formatTime(pointerTime);
    const text = currentTime.padStart(toolConst.duration.length, '00:')
    el.timeTip.innerText = text;
    const width = el.timeTip.clientWidth / 2;
    el.timeTip.style.transform = `translateX(${position - width + 7}px)`;
  }))

  volumeBar.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    volumePopover.classList.add('block');
    const currentY = getComputedStyle(volumeBar).transform;
    const originY = e.clientY - parseInt(currentY.split(',')[5]);
    document.onmousemove = function (mouseEvent) {
      const y = mouseEvent.clientY;
      const maxRange = {
        min: -6,
        max: 44
      }
      let top = y - originY;
      if (top < maxRange.min) top = maxRange.min;
      if (top > maxRange.max) top = maxRange.max;
      requestAnimationFrame(() => {
        setVolume(top);
      })
    }
  });

  volumeBar.onmouseup = function () {
    volumePopover.classList.remove('block');
  }

  mute.addEventListener('click', function () {
    volume.classList.remove('hide');
    mute.classList.add('hide');
    setVolume(-6)
  })
  volume.addEventListener('click', function () {
    volume.classList.add('hide');
    mute.classList.remove('hide');
    setVolume(44);
  })

  function setVolume (top: number) {
    volumeBar.style.transform = `translateY(${top}px)`;
    volumeProgressActive.style.top = top + 'px';
     // 计算音量值
     const value = (100 - (100 * ((top + 6) / 50))).toFixed(0)
     volumeValue.innerText = value;
     el.videoEl.volume = parseInt(value) / 100;
  }

  // 切换清晰度功能
  el.videoSources?.addEventListener('click', function (e) {
    const target = e.target as HTMLElement;;
    if (target.classList.contains('source-item')) {
      if (target.classList.contains('active')) return false;
      const sources = config.url as Sources[];
      const tag = target.innerText;
      const source = sources.find(i => i.tag === tag);
      if (source) {
        layer.toast(`正在切换至${tag}...`);
        // 切换清晰度
        const isPause = el.videoEl.paused;
        const v = document.createElement('video');
        const currentTime = el.videoEl.currentTime;
        v.src = source.source;
        v.currentTime = currentTime;
        const time = new Date().valueOf();
        //页面的交互

        const text = el.videoSources?.querySelector('.text') as HTMLElement;
        const sourcesItem = el.videoSources?.querySelector('.source-item.active');
        const popover = el.videoSources?.querySelector('.uni-player-popover') as HTMLElement;
        if (popover) {
          popover.classList.add('hide');
          setTimeout(() => {
            popover.classList.remove('hide');
          }, 300);
        }
        sourcesItem?.classList.remove('active');
        target.classList.add('active');
        if (config.isHls) {
          const index = source.source;
          toolConst.hls.currentLevel = index;
          layer.toast(`已经切换至${tag}`, 1);
          if (text) text.innerText = tag;
          return false;
        }

        v.oncanplaythrough = function () {
          el.videoEl.src = source.source;
          const endTime = new Date().valueOf();
          if (isPause) {
            el.videoEl.currentTime = currentTime
            el.videoEl.pause();
          } else {
            el.videoEl.currentTime = currentTime + (endTime - time) / 1000;
            el.videoEl.play();
          }
          if (text) text.innerText = tag;
          layer.close();
          layer.toast(`已经切换至${tag}`, 1);
        }
      }
    }
  } )
}