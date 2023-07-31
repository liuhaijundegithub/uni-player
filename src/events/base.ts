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
    fullScreen(el.videoWrapperEl);
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
}