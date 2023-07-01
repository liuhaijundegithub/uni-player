declare module 'UniPlayer';

export interface UniPlayerConfig {
  container: string | HTMLElement;
  url: string;
  autoPlay?: boolean;
}

export interface UniPlayerStatus extends UniPlayerConfig {
}