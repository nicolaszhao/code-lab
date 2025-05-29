import type { Easing } from './easing';
import { easings } from './easing';

function camelCase(string: string): string {
  return string.replace(/-([\da-z])/gi, function (_, letter) {
    return letter.toUpperCase();
  });
}

type Direction = 'left' | 'right' | 'top' | 'bottom';

function calculateTranslate(
  direction: Direction,
  initialX: number,
  initialY: number,
  distance: number,
): {
  x: number;
  y: number;
} {
  switch (direction) {
    case 'left':
      return { x: initialX + distance, y: initialY };
    case 'right':
      return { x: initialX - distance, y: initialY };
    case 'top':
      return { x: initialX, y: initialY - distance };
    case 'bottom':
      return { x: initialX, y: initialY + distance };
  }
}

function element(el: string | HTMLElement): HTMLElement | null {
  return el instanceof HTMLElement ? el : document.querySelector(el);
}

function css(el: string | HTMLElement, prop: string, val?: string) {
  const $el = element(el);
  if (!$el) {
    return;
  }
  if (typeof val !== 'undefined') {
    $el.style[prop as any] = val;
    return;
  }
  const style = document.defaultView?.getComputedStyle($el);
  return style?.getPropertyValue(prop);
}

export function move(
  el: string | HTMLElement,
  direction: Direction,
  options: {
    mode?: 'RAF' | 'ST';
    distance: number;
    duration?: number;
    easing?: Easing;
    onStep?: (progress: number) => void;
    onComplete?: () => void;
  },
): void {
  const { duration = 400, easing = 'linear' } = options;
  const startTime = Date.now();
  let translateX = 0;
  let translateY = 0;

  const transform = css(el, 'transform') ?? '';
  const matrix = new DOMMatrix(transform === 'none' ? '' : transform);
  const initialX = matrix.m41;
  const initialY = matrix.m42;

  function step() {
    const remaining = Math.max(0, startTime + duration - Date.now());
    const percent = 1 - remaining / duration;
    const easedPercent = easings[camelCase(easing) as Easing](percent);
    const moveDistance = options.distance * easedPercent;
    const progress = Math.floor(percent * 100);

    const { x, y } = calculateTranslate(
      direction,
      initialX,
      initialY,
      moveDistance,
    );
    translateX = x;
    translateY = y;

    css(el, 'transform', `translate(${translateX}px, ${translateY}px)`);
    options.onStep?.(progress);

    if (percent < 1) {
      run();
    } else {
      options.onComplete?.();
    }
  }

  function run() {
    if (options.mode === 'RAF') {
      requestAnimationFrame(step);
    } else {
      // Approximate frame duration in milliseconds
      const frameDuration = 13;
      setTimeout(step, frameDuration);
    }
  }

  run();
}
