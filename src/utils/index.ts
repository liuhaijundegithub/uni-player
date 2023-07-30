import { UniPlayerConfig } from '../../types/UniPlayer';
import {
  play,
  pause,
  paused
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
  const string = `<div class="play iconfont">
    <img src="${play}" />
  </div>`;
  return string2HtmlNode(string);
}
export const generatePauseBtn = () => {
  const string = `<div class="pause hide iconfont">
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