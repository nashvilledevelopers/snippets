/**
 * Random utility functions.
 */

// Camel case a thing!
export const camelCase = str =>
  `${str.charAt(0).toLowerCase()}${str
    .replace(/[\W_]/g, "|")
    .split("|")
    .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("")
    .slice(1)}`;

// Debounce a thing!
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

// Check if a thing is in the viewport!
export const inViewport = (el, h) => {
  const docElem = window.document.documentElement;

  function getViewportH() {
    const client = docElem.clientHeight;
    const inner = window.innerHeight;

    if (client < inner) {
      return inner;
    } else {
      return client;
    }
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  // http://stackoverflow.com/a/5598797/989439
  function getOffset(el) {
    let offsetTop = 0;
    let offsetLeft = 0;
    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while ((el = el.offsetParent)); // eslint-disable-line no-cond-assign

    return {
      top: offsetTop,
      left: offsetLeft
    };
  }
  const elH = el.offsetHeight;
  const scrolled = scrollY();
  const viewed = scrolled + getViewportH();
  const elTop = getOffset(el).top;
  const elBottom = elTop + elH;

  // if 0, the element is considered in the viewport as soon as it enters.
  // if 1, the element is considered in the viewport only when it's fully inside
  // value in percentage (1 >= h >= 0)
  h = h || 0;

  return elTop + elH * h <= viewed && elBottom >= scrolled;
};

// Check if a thing's transition is done transitioning!
// Example usage:
// const transitionEnd = onTransitionEnd( element );
// element.addEventListener( transitionEnd, func, false );
export const onTransitionEnd = el => {
  const transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };

  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};
