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

export const formatTime = (value: number) => {
    let secondTime = parseInt(String(value)) as any;
    let minuteTime = 0 as any;
    let hourTime = 0 as any;
    if (secondTime >= 60) {
      minuteTime = parseInt(String(secondTime / 60));
      secondTime = parseInt(String(secondTime % 60));
      if (minuteTime >= 60) {
        hourTime = parseInt(String(minuteTime / 60));
        minuteTime = parseInt(String(minuteTime % 60));
      }
    }
    // 补0
    hourTime = hourTime < 10 ? "0" + hourTime : hourTime;
    minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
    secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
    let res = (hourTime === '00' ? '' : hourTime + ":") + minuteTime + ":" + secondTime;
    return res;
};
