import { UniPlayerConfig } from '../UniPlayer';

const error = (content: string) => {
  console.error(content);  
}

export const isValidContainer = (container: UniPlayerConfig['container']) => {
  if (!container) {
    error(`"container is not a valid HTML element"`);
    return false;
  }
  if (typeof container === 'string') {
    const el = document.querySelector(container);
    if (!el) {
      error(`"${container}" is not a valid HTML element selector"`);
      return false;
    }
  }
  return true;
};

export const elIsFullScreen = () => {
  return document.fullscreenElement || false;
}