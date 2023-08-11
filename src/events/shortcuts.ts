import { El, ToolConst, UniPlayerConfig } from '../../types/UniPlayer';
import { fullScreen, setVideoPlay, setVideoPause } from '../utils/videoBehavior';

export default function bindShortCuts (el: El, toolConst: ToolConst, config: UniPlayerConfig) {
  // 绑定快捷键
  document.addEventListener('keydown', function (e: KeyboardEvent) {
    const shortcuts = ['f', ' ']
    const key = e.key.toLocaleLowerCase()
    if (!shortcuts.includes(key)) return false;
    // 检查一下是否有聚焦的元素 input textarea
    const inputFocus = document.querySelectorAll('input:focus').length;
    const TextareaFocus = document.querySelectorAll('textarea:focus').length;
    if (!inputFocus && !TextareaFocus) {
      if (key === 'f') {
        fullScreen(el.videoWrapperEl, el, toolConst);
      }
      if (key === ' ') {
        const paused = el.videoEl.paused;
        if (paused) setVideoPlay(el.videoEl)
        else setVideoPause(el.videoEl);
      }
    }
  })
}