declare module 'UniPlayer';

export interface UniPlayerConfig {
  container: string | HTMLElement;
  url: string;
  autoPlay?: boolean;
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
}

export interface ToolConst {
  duration: string;
  playerWidth: number;
  isMouseMoving: boolean;
  playerClientLeft: number;
  maxRange: number;
  videoTime: number;
  clickTimer: number;
  toolBarTimer: number;
  speed: number;
  isMouseDown: boolean;
}

export type Speed = { label: string; value: string | number };