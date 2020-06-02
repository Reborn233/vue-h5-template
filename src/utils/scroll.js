/* 滚动相关 */
import { createAnimate } from './animate';
/**
 * 获取垂直滚动距离
 * @param {HTMLElement} el 滚动节点
 */
export function getScrollTop (el) {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}

/**
 * 设置垂直滚动位置
 * @param {HTMLElement} el 滚动节点
 * @param {Number} value 滚动位置
 */
export function setScrollTop (el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  }
  else {
    el.scrollTo(el.scrollX, value);
  }
}

/**
 * 获取水平滚动距离
 * @param {HTMLElement} el 滚动节点
 */
export function getScrollLeft (el) {
  return 'scrollLeft' in el ? el.scrollLeft : el.pageXOffset;
}

/**
 * 设置水平滚动位置
 * @param {HTMLElement} el 滚动节点
 * @param {Number} value 滚动位置
 */
export function setScrollLeft (el, value) {
  if ('scrollLeft' in el) {
    el.scrollLeft = value;
  }
  else {
    el.scrollTo(value, el.scrollY);
  }
}

/**
 * 设置滚动位置
 * @param {HTMLElement} el 滚动节点
 * @param {Number} x 水平位置
 * @param {Number} y 垂直位置
 */
export function setScrollPosition (el, x, y) {
  if ('scrollLeft' in el && 'scrollTop' in el) {
    el.scrollTop = y;
    el.scrollLeft = x;
  }
  else {
    el.scrollTo(x, y);
  }
}

/**
 * 获取滚动容器可视区域高度
 * @param {HTMLElement} el 滚动节点
 */
export function getVisibleHeight (el) {
  return el.getBoundingClientRect().height;
}

/**
 * 动画滚动
 * @param {HTMLElement} el 滚动节点
 * @param {Number} x 水平位置
 * @param {Number} y 垂直位置
 * @param {Number} duration 动画毫秒数
 * @param {Function} easingFn easing动画函数，引入easing.js中的动画函数
 */
export function scrollToByAnimate (el, x, y, duration = 500, easingFn) {
  const startPoint = { x: getScrollLeft(el), y: getScrollTop(el) };
  const endPoint = { x, y };
  const animateFn = createAnimate(duration, easingFn);

  const animateCallback = easing => {
    const newPoint = {};
    Object.keys(endPoint).forEach(key => {
      const startValue = startPoint[key];
      const endValue = endPoint[key];
      newPoint[key] = (endValue - startValue) * easing + startValue;
    });
    setScrollPosition(el, newPoint.x, newPoint.y);
  };

  animateFn(animateCallback);
}
