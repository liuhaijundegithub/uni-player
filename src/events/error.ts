import { El, ToolConst, UniPlayerConfig } from '../../types/UniPlayer';
import layer from '../utils/layer';

export default function handError (el: El, toolConst: ToolConst, config: UniPlayerConfig) {
  el.videoEl.addEventListener('error', function (error) {
    console.log(error);
    layer.toast('加载失败');
  })
}