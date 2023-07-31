export const throttle = (func: Function, wait = 50) => {
  let flag = true;
  return (...args) => {
      if (flag) {
          setTimeout(() => {
              func.apply(this, args);
              flag = true;
          }, wait);
      }
      flag = false;
  };
}


/**
 * @description 判断鼠标是不是在目标元素内
 */
export const checkIfPointerInside = (obj: HTMLElement) => {
    var x = Number(window.event.clientX) // 鼠标相对屏幕横坐标
    var y = Number(window.event.clientY) // 鼠标相对屏幕纵坐标

    var div_x = Number(obj.getBoundingClientRect().left) // obj相对屏幕的横坐标
    var div_x_width = Number(
        obj.getBoundingClientRect().left + obj.clientWidth
    ) // obj相对屏幕的横坐标+width

    var div_y = Number(obj.getBoundingClientRect().top) // obj相对屏幕的纵坐标
    var div_y_height = Number(
        obj.getBoundingClientRect().top + obj.clientHeight
    ) // obj相对屏幕的纵坐标+height

    if (x > div_x && x < div_x_width && y > div_y && y < div_y_height) {
        return true
    } else {
        return false
    }
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
    s += ('0' + minutes).slice(-2) + ':';
    s += ('0' + seconds.toFixed(0)).slice(-2);
    return s;
};