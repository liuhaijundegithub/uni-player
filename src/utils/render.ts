import { UniPlayerConfig } from '../../types/UniPlayer';
import { string2HtmlNode } from './index';
import { elIsFullScreen } from './is';

const videoWrapper = '<div class="uni-player-wrapper"></div>';

export const init = (el: HTMLElement, config: UniPlayerConfig) => {
  el.classList.add('uni-player');
  const videoEl = string2HtmlNode('<video></video>') as HTMLVideoElement;
  videoEl.controls = false;
  const videoWrapperEl = string2HtmlNode(videoWrapper);
  // 绑定全屏事件
  videoWrapperEl.addEventListener('dblclick', function () {
    if (elIsFullScreen()) {
      document.exitFullscreen();
    } else {
      videoWrapperEl.requestFullscreen();
    }
  });
  videoWrapperEl.appendChild(videoEl);
  videoEl.src = config.url;
  el.appendChild(videoWrapperEl);
  return {
    videoEl
  }
}