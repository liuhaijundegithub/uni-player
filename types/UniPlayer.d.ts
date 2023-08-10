declare module 'UniPlayer';

interface Sources {
  source: string;
  tag: string;
  active?: boolean; // 默认播放的清晰度流
}
export interface UniPlayerConfig {
  container: string | HTMLElement;
  url: string | Sources[];
  autoPlay?: boolean;
  startTime?: number; // 开始播放的时间
}

export interface UniPlayerStatus extends UniPlayerConfig {
}

export interface El {
  allEls: DocumentFragment;
  videoEl: HTMLVideoElement;
  videoWrapperEl: HTMLElement;
  pausedIcon: HTMLElement;
  toolbarEl: HTMLElement;
  timeEl: HTMLElement;
  toolbarElLeft: HTMLElement;
  toolbarElRight: HTMLElement;
  progress: HTMLElement;
  progressFull: HTMLElement;
  progresPlayed: HTMLElement;
  progresBuffer: HTMLElement;
  pauseBtn: HTMLElement;
  playBtn: HTMLElement;
  bar: HTMLElement;
  timeTip: HTMLElement;
  fullScreenEntry: HTMLElement;
  fullScreenExit: HTMLElement;
  speedPlay: HTMLElement;
  loadingEl: HTMLElement;
  voice: HTMLElement;
  bottomProgress: HTMLElement;
  videoSources?: HTMLElement;
}

export interface ToolConst {
  duration: string;
  playerWidth: number;
  isMouseMoving: boolean;
  playerClientLeft: number;
  maxRange: number;
  videoTime: number;
  clickTimer: NodeJS.Timer | number;
  toolBarTimer: NodeJS.Timer | number;
  speed: number;
  isMouseDown: boolean;
  loadingTimer: NodeJS.Timer | number;
  eventBinded: boolean;
}

export type Speed = { label: string; value: string | number };