import { El, ToolConst } from '../../types/UniPlayer';
import {
  setVideoPause,
  setVideoPlay,
  fullScreen,
  delayHideToolbar,
  toolbarFadeOutAndHide,
  setTime,
  setPlayedProgress,
  setBarPosition
} from '../utils/videoBehavior';

export default function (el: El, toolConst: ToolConst) {
  el.playBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    el.videoEl.play();
  })

  el.pauseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    el.videoEl.pause();
  })

  // 绑定全屏事件
  el.videoWrapperEl.addEventListener('dblclick', function () {
    clearTimeout(toolConst.clickTimer);
    fullScreen(el.videoWrapperEl, el);
  });

  // 绑定 点击暂停/播放事件
  el.videoWrapperEl.addEventListener('click', function (e) {
    if (toolConst.isMouseMoving) return false;
    e.stopPropagation();
    clearTimeout(toolConst.clickTimer);
    toolConst.clickTimer = setTimeout(() => {
      const paused = el.videoEl.paused;
      if (paused) setVideoPlay(el.videoEl)
      else setVideoPause(el.videoEl);
    }, 300);
  });

  // 鼠标移入 移出
  el.videoWrapperEl.addEventListener('mouseenter', function () {
    el.toolbarEl.classList.add('show');
    delayHideToolbar(el, toolConst)
  });

  el.videoWrapperEl.addEventListener('mouseleave', function () {
    toolbarFadeOutAndHide(el, toolConst);
    clearTimeout(toolConst.toolBarTimer);
  })

    // 鼠标移动
  el.videoWrapperEl.addEventListener('mousemove', function () {
    // 鼠标一动 就开始重新计时
    clearTimeout(toolConst.toolBarTimer);
    el.toolbarEl.classList.add('show');
    delayHideToolbar(el, toolConst)
  })

  el.videoEl.onplay = () => {
    el.playBtn.classList.add('hide');
    el.pauseBtn.classList.remove('hide');
    el.pausedIcon.classList.add('hide');
  }
  el.videoEl.onpause = () => {
    el.pauseBtn.classList.add('hide');
    el.playBtn.classList.remove('hide');
    el.pausedIcon.classList.remove('hide');
  }

  el.videoEl.addEventListener('timeupdate', function (e: any) {
    const currentTime = el.videoEl.currentTime;
    const x = toolConst.maxRange * (currentTime / toolConst.videoTime);
    if (!toolConst.isMouseMoving) {
      setBarPosition(el.bar, x);
      setPlayedProgress(el, toolConst, x);
    }
    setTime(el, toolConst);
  })

  // 点击右下角全屏
  el.fullScreenEntry.addEventListener('click', function () {
    fullScreen(el.videoWrapperEl, el);
  })

  // 点击右下角取消全屏
  el.fullScreenExit.addEventListener('click', function () {
    fullScreen(el.videoWrapperEl, el);
  });

  // 倍速播放
  el.speedPlay.addEventListener('click', function (e: any) {
    if (e.target?.classList.contains('speed-item')) {
      const value = Number(e.target.dataset.value);
      el.videoEl.playbackRate = value;
      const popover = document.querySelector('.uni-player-wrapper .uni-player-speed .uni-player-popover') as HTMLElement;
      popover.classList.add('hide');
      setTimeout(() => {
        popover.classList.remove('hide');
      }, 300);
    }
  });

  // 监听视频倍速变化
  el.videoEl.addEventListener('ratechange', function (e) {
    const rate = el.videoEl.playbackRate;
    const content = document.querySelector('.uni-player-wrapper .uni-player-speed .uni-player-popover .uni-player-content') as HTMLElement;
    Array.from(content.children).forEach((i: any) => {
      if (rate === Number(i.dataset.value)) {
        i.classList.add('active')
        const text = document.querySelector('.uni-player-wrapper .uni-player-speed .text') as HTMLElement;
        text.innerText = i.innerText;
      } else {
        i.classList.remove('active');
      }
    });
  })

  el.videoWrapperEl.addEventListener('fullscreenchange', function (e) {
    if (document.fullscreenElement && document.fullscreenElement.classList.contains('uni-player-wrapper')) {
      el.fullScreenExit.classList.remove('hide');
      el.fullScreenEntry.classList.add('hide');
    } else {
      el.fullScreenExit.classList.add('hide');
      el.fullScreenEntry.classList.remove('hide');
    }
  })

}