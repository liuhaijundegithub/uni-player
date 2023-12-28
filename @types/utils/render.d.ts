import { UniPlayerConfig } from '../../types/UniPlayer';
import { El, UniCallBack } from '../../types/UniPlayer';
declare const render: (container: HTMLElement, config: UniPlayerConfig, callbacks: UniCallBack) => {
    el: El;
};
export default render;
