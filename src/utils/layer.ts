export default {
  close: function () {
    const wrapperEl = document.querySelector('.uni-player-wrapper') as HTMLElement;
    const toasts = wrapperEl.querySelectorAll('.uni-player-toast');
    toasts.forEach((i: any) => {
      i.classList.add('fade-out');
      i.ontransitionend = function () {
        wrapperEl.removeChild(i)
        i.ontransitionend = null;
      }
    });
  },
  toast: function (msg: string, durationSeconds?: number) {
    const div = document.createElement('div');
    div.innerText = msg;
    div.classList.add('uni-player-toast');
    const wrapperEl = document.querySelector('.uni-player-wrapper');
    wrapperEl?.appendChild(div);

    if (durationSeconds) {
      setTimeout(() => {
        this.close()
      }, durationSeconds * 1000)
    }
  }
}