import { isValidContainer } from '../utils/is';
import { UniPlayerConfig, UniPlayerStatus, El } from '../../types/UniPlayer';
import render from '../utils/render';
import { getWrapper } from '../utils/index';

class UniPlayer {
  private config: UniPlayerStatus
  private el: El | null;
  constructor (config: UniPlayerConfig) {
    this.config = {
      ...config
    };
    const {
      container
    } = this.config;
    if (isValidContainer(container)) {
      const { el } = render(
        getWrapper(container) as HTMLElement,
        config
      );
      this.el = el;
    }
  }

  play () {
    this.el.videoEl?.play();
  }

  pause () {
    this.el.videoEl?.pause();
  }

  // 全屏播放
  requestFullScreen () {
    // document.exitFullscreen();
    this.el.videoWrapperEl.requestFullscreen()
  }

  // 取消全屏播放
  cancelFullScreen () {
    document.exitFullscreen();
  }

  // 销毁播放器
  destory () {
    const el = document.querySelector(this.config.container as string);
    el.innerHTML = '';
  }

  // 跳转播放
  skipTo (time: number) {
    this.el.videoEl.currentTime = time;
  }

  // 设置音量
  setVolume (value: number) {
    if (value < 0) value = 0
    if (value > 100) value = 100;
    value = parseInt(String(value))
    this.el.videoEl.volume = value / 100;
    const top = 46 - (value / 100) * 50;
    const volumeBar = document.querySelector('.uni-player-wrapper .volume-bar-progress .bar') as HTMLElement;
    const volumeProgressActive = document.querySelector('.uni-player-wrapper .volume-bar-progress .volume-bar-progress-active') as HTMLElement;
    const volumeValue = document.querySelector('.uni-player-wrapper .uni-voice .uni-player-popover .volume-value') as HTMLElement;
    volumeValue.innerText = String(value);
    volumeBar.style.transform = `translateY(${top}px)`;
    volumeProgressActive.style.top = top + 'px';
  }
}

export default UniPlayer;