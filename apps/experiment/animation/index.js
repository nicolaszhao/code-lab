export function $(el) {
  const $el = el instanceof HTMLElement ? el : document.querySelector(el);

  return {
    get() {
      return $el;
    },

    on(type, fn) {
      $el.addEventListener(type, fn);
      return this;
    },
  };
}

$.ready = function (fn) {
  document.addEventListener('DOMContentLoaded', fn);
};
