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