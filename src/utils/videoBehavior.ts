import { elIsFullScreen } from '../utils/is';
import { formatTime } from '../utils/utils';
import { El, ToolConst } from '../../types/UniPlayer';

export function setVideoPlay (el: HTMLVideoElement) {
  el.play();
}
export function setVideoPause (el: HTMLVideoElement) {
  el.pause();
}

export function initPlayerWrapperWidth (el: El, toolConst: ToolConst) {
  const pWidth = el.videoWrapperEl.clientWidth;
  toolConst.playerWidth = pWidth;
  toolConst.playerClientLeft = el.videoWrapperEl.getBoundingClientRect().left;
  toolConst.maxRange = toolConst.playerWidth - 20 - 21;
}
export const fullScreen = (dom: HTMLElement, el: El, toolConst: ToolConst) => {
  if (elIsFullScreen()) {
    document.exitFullscreen();
  } else {
    dom.requestFullscreen();
  }
}


export function setTime (el: El, toolConst: ToolConst) {
  const currentTime = formatTime(el.videoEl.currentTime);
  const html = currentTime.padStart(toolConst.duration.length, '00:') + '<span class="dash">/</span>' + toolConst.duration;
  el.timeEl.innerHTML = html;
}

export function toolbarFadeOutAndHide (el: El, toolConst: ToolConst) {
  el.toolbarEl.classList.add('fadeOut');
  el.toolbarEl.onanimationend = function () {
    el.toolbarEl.classList.remove('fadeOut');
    el.toolbarEl.classList.remove('show');
    setTimeout(() => {
      el.toolbarEl.onanimationend = null;
    }, 200)
  }
}

export function delayHideToolbar (el: El, toolConst: ToolConst) {
  toolConst.toolBarTimer = setTimeout(() => {
    toolbarFadeOutAndHide(el, toolConst);
    el.bottomProgress.classList.remove('hide');
  }, 2000)
}


export function setPlayedProgress (el:El, toolConst: ToolConst, x: number) {
  const right = toolConst.maxRange - x;
  el.progresPlayed.style.right = right + 'px';
}
export function setBottomProgress (el:El, toolConst: ToolConst, x: number) {
  const right = toolConst.playerWidth - x;
  el.bottomProgress.style.right = right + 'px';
}

export const setBarPosition = (
  bar: HTMLElement,
  value: number,
  videoEl?: HTMLVideoElement,
  allWidth?: number,
  videoTime?: number
) => {
  let transforms = bar.style.transform.split(' ');
  if (transforms.some(i => i.includes('translateX'))) {
    transforms = transforms.filter(i => !i.includes('translateX') && Boolean(i));
    transforms.push(`translateX(${value}px)`);
  } else {
    transforms.push(`translateX(${value}px)`);
  }
  bar.style.transform = transforms.join(' ');


  // 如果传了videoEl 那么定位一下时间
  if (videoEl && allWidth && videoTime) {
    const t = (videoTime * ((value < 0 ? 0 : value) / allWidth));
    if (t) videoEl.currentTime = t;
  }
};