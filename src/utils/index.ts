import { UniPlayerConfig, Speed } from '../../types/UniPlayer';
import {
  play,
  pause,
  paused,
  fullScreenEnter,
  fullScreenExit,
  loading,
  volume,
  mute
} from '../icons/index';

export const string2HtmlNode = (htmlString: string) => {
  const el = document.createElement('div');
  el.innerHTML = htmlString;
  return el.childNodes[0] as HTMLElement;
};

export const getWrapper = (container: UniPlayerConfig['container']) => {
  if (typeof container === 'string') return document.querySelector(container);
  else return container;
}

export const generateVideoEl = () => {
  return string2HtmlNode('<video></video>') as HTMLVideoElement;
};

export const generateVideoWrapperEl = () => {
  const string = '<div class="uni-player-wrapper"></div>';
  return string2HtmlNode(string);
}


export const generateToolbar = () => {
  const toolBarWrapperString = '<div class="uni-player-toolbar"></div>"'
  return string2HtmlNode(toolBarWrapperString);
};

export const generateToolbarLeftWrapper = () => {
  const string = '<div class="uni-player-toolbar-left"></div>'
  return string2HtmlNode(string);
}
export const generateToolbarRightWrapper = () => {
  const string = '<div class="uni-player-toolbar-right"></div>'
  return string2HtmlNode(string);
}

export const generatePlayBtn = () => {
  const string = `<div class="play uni-logo">
    <img src="${play}" />
  </div>`;
  return string2HtmlNode(string);
}
export const generatePauseBtn = () => {
  const string = `<div class="pause hide uni-logo">
    <img src="${pause}" />
  </div>`;
  return string2HtmlNode(string);
}

export const generateBigPauseIcon = () => {
  const string = `<span class="paused big">
    <img src="${paused}" />
  </span>`;
  return string2HtmlNode(string);
}

export const generatePlayedProgress = () => {
  const string = '<div class="progress-played"></div>';
  return string2HtmlNode(string);
}

export const generateBufferProgress = () => {
  const string = '<div class="progress-buffer"></div>';
  return string2HtmlNode(string);
};

export const generateTime = () => {
  const string = '<div class="time"></div>'
  return string2HtmlNode(string);
}

export const generateProgress = () => {
  const string = '<div class="progress"></div>';
  return string2HtmlNode(string);
}

// 生成全部的进度条
export const generateFullProgress = () => {
  const string = '<div class="progress-full"></div>';
  return string2HtmlNode(string);
};

export const generateBar = () => {
  const string = '<div class="progress-bar"></div>';
  return string2HtmlNode(string);
}

export const generateTimeTip = () => {
  const string = '<div class="time-tip"></div>'
  return string2HtmlNode(string);
}

export const generateFullScreenEnterIcon = () => {
  const string = `<span class="full-enter uni-logo" style="margin-right: 2px;" title="全屏">
    <img src="${fullScreenEnter}" />
  </span>`;
  return string2HtmlNode(string);
};

export const generateFullScreenExitIcon = () => {
  const string = `<span class="full-exit uni-logo hide" style="margin-right: 2px;" title="取消全屏">
    <img src="${fullScreenExit}" />
  </span>`;
  return string2HtmlNode(string);
};

export const generateLoading = () => {
  const string = `<div class="uni-player-loading hide">
    <div class="uni-player-loading-logo">
      <img src=${loading} />
    </div>
    <div class="uni-player-loading-text">加载中···</div>
  </div>`;
  return string2HtmlNode(string);
}

export const generateSpeedPlay = (speed: Speed[]) => {
  const html = speed.map(i => {
    return `<div class="speed-item ${i.value === 1 ? 'active' : ''}" data-value="${i.value}">${i.label}</div>`
  }).join('');
  const string = `<span class="uni-logo uni-player-speed">
    <span class="text">倍速</span>
    <div class="uni-player-popover">
      <div class="uni-player-content">
        ${html}
      </div>
      <div class="uni-player-empty"></div>
    <div>
  </span>`
  return string2HtmlNode(string);
}

export const generateBottomProgress = () => {
  const string = '<div class="uni-bottom-progress"></div>';
  return string2HtmlNode(string);
};

export const generateVoice = () => {
  const string = `<span class="uni-logo uni-voice">
    <img src=${volume} class="volume" />
    <img src=${mute} class="hide mute" />
    <div class="uni-player-popover">
      <div class="uni-player-content">
        <div class="volume-value">100</div>
        <div class="volume-bar-progress">
          <div class="bar"></div>
          <div class="volume-bar-progress-active"></div>
        </div>
      </div>
      <div class="uni-player-empty"></div>
    <div>
  </span>`;
  return string2HtmlNode(string);
}