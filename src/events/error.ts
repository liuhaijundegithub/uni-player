import { El, ToolConst, UniPlayerConfig, UniCallBack } from '../UniPlayer';
import layer from '../utils/layer';

export default function handError (el: El, toolConst: ToolConst, config: UniPlayerConfig, callbacks: UniCallBack) {
  el.videoEl.addEventListener('error', function (error) {
    clearTimeout(toolConst.loadingTimer);
    el.loadingEl.classList.add('hide')
    layer.toast('加载失败');
    const onError = callbacks.get('error');
    onError && onError(error);
  })
}