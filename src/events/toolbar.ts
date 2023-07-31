import { El, ToolConst } from '../../types/UniPlayer';
import {
  setBarPosition,
  setPlayedProgress
} from '../utils/videoBehavior';

import { checkIfPointerInside, formatTime } from '../utils/utils';

import { throttle } from '../utils/utils';

export const toogleBarScale = (bar: HTMLElement, hide: boolean, transtion = false) => {
  let transforms = bar.style.transform.split(' ');
  transforms = transforms.filter(i => i !== `scale(${hide ? 1 : 0})` && Boolean(i));
  transforms.push(`scale(${hide ? 0 : 1})`);
  bar.style.transform = transforms.join(' ');
}

export default function (el: El, toolConst: ToolConst) {
  el.toolbarEl.onclick = e => e.stopPropagation();

  // 点击进度条定位时间
  el.progress.addEventListener('click', function (e) {
    e.stopPropagation();
    if (toolConst.isMouseMoving) return false;
    const x = e.clientX;
    const position = x - toolConst.playerClientLeft - 10 - 12;
    setBarPosition(el.bar, position, el.videoEl, toolConst.maxRange, toolConst.videoTime);
    toogleBarScale(el.bar, false);
    setPlayedProgress(el, toolConst, position);
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

  document.onmouseup = function (e) {
    document.onmousemove = null;
    setTimeout(() => {
      toolConst.isMouseMoving = false;
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
    const currentTime = formatTime(pointerTime * 1000);
    const text = currentTime.padStart(toolConst.duration.length, '00:')
    el.timeTip.innerText = text;
    const width = el.timeTip.clientWidth / 2;
    el.timeTip.style.transform = `translateX(${position - width + 7}px)`;
  }))
}