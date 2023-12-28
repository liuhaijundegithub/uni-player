import { UniPlayerConfig, UniPlayerEvent } from '../../types/UniPlayer';
declare class UniPlayer {
    private config;
    private el;
    private callbacks;
    constructor(config: UniPlayerConfig);
    private init;
    play(): void;
    pause(): void;
    requestFullScreen(): void;
    cancelFullScreen(): void;
    destory(): void;
    skipTo(time: number): void;
    setVolume(value: number): void;
    reload(config: Partial<UniPlayerConfig>): void;
    on(eventName: UniPlayerEvent, func: Function): void;
}
export default UniPlayer;
