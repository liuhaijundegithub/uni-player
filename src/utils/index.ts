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

export const formatTime = (millisecond: number) => {
  if (millisecond === undefined) return '-';
  const days = parseInt(String(millisecond / (1000 * 60 * 60 * 24)));
  const hours = parseInt(String((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = parseInt(String((millisecond % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = (millisecond % (1000 * 60)) / 1000;

  let s = '';
  if (days > 0) s += ('0' + days).slice(-2) + ':';
  if (hours > 0) s += ('0' + hours).slice(-2) + ':';
  if (minutes > 0) s += ('0' + minutes).slice(-2) + ':';
  if (seconds > 0) s += ('0' + seconds.toFixed(0)).slice(-2);
  return s;
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

export const setBarPosition = (
  bar: HTMLElement,
  value: number,
  videoEl?: HTMLVideoElement,
  allWidth?: number,
  videoTime?: number
) => {
  let transforms = bar.style.transform.split(' ');
  if (transforms.some(i => i.includes('translateX'))) {
    transforms = transforms.filter(i => !i.includes('translateX') && Boolean(i));
    transforms.push(`translateX(${value}px)`);
  } else {
    transforms.push(`translateX(${value}px)`);
  }
  bar.style.transform = transforms.join(' ');

  if (videoEl && allWidth && videoTime) {
    const t = (videoTime * ((value < 0 ? 0 : value) / allWidth));
    if (t) videoEl.currentTime = t;
  }
};

export const toogleBarScale = (bar: HTMLElement, hide: boolean, transtion = false) => {
  let transforms = bar.style.transform.split(' ');
  transforms = transforms.filter(i => i !== `scale(${hide ? 1 : 0})` && Boolean(i));
  transforms.push(`scale(${hide ? 0 : 1})`);
  bar.style.transform = transforms.join(' ');
  // bar.ontransitionend = function () {
  //   bar.classList.remove('transtion');
  //   bar.ontransitionend = null;
  // }
}