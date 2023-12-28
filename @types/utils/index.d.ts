import { UniPlayerConfig, Speed, Sources } from '../../types/UniPlayer';
export declare const string2HtmlNode: (htmlString: string) => HTMLElement;
export declare const getWrapper: (container: UniPlayerConfig['container']) => Element;
export declare const generateVideoEl: () => HTMLVideoElement;
export declare const generateVideoWrapperEl: () => HTMLElement;
export declare const generateToolbar: () => HTMLElement;
export declare const generateToolbarLeftWrapper: () => HTMLElement;
export declare const generateToolbarRightWrapper: () => HTMLElement;
export declare const generatePlayBtn: () => HTMLElement;
export declare const generatePauseBtn: () => HTMLElement;
export declare const generateBigPauseIcon: () => HTMLElement;
export declare const generatePlayedProgress: () => HTMLElement;
export declare const generateBufferProgress: () => HTMLElement;
export declare const generateTime: () => HTMLElement;
export declare const generateProgress: () => HTMLElement;
export declare const generateFullProgress: () => HTMLElement;
export declare const generateBar: () => HTMLElement;
export declare const generateTimeTip: () => HTMLElement;
export declare const generateFullScreenEnterIcon: () => HTMLElement;
export declare const generateFullScreenExitIcon: () => HTMLElement;
export declare const generateLoading: () => HTMLElement;
export declare const generateSpeedPlay: (speed: Speed[]) => HTMLElement;
export declare const generateBottomProgress: () => HTMLElement;
export declare const generateVoice: () => HTMLElement;
export declare const generateVideoSources: (sources: Sources[]) => HTMLElement;
export declare const generateLiveTag: () => HTMLElement;
