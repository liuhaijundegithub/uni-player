import { isValidContainer } from '../utils/is';
import { UniPlayerConfig, UniPlayerStatus } from '../../types/UniPlayer';
import render from '../utils/render';
import { getWrapper } from '../utils/index';

class UniPlayer {
  private config: UniPlayerStatus
  private videoEl: HTMLVideoElement;
  constructor (config: UniPlayerConfig) {
    this.config = {
      ...config
    };
    const {
      container
    } = this.config;
    if (isValidContainer(container)) {
      const { videoEl } = render(
        getWrapper(container) as HTMLElement,
        config
      );
      this.videoEl = videoEl;
    }
  }

  play () {
    this.videoEl.play();
  }

  pause () {
    this.videoEl.pause();
  }
}

export default UniPlayer;