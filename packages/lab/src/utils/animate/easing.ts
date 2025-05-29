export type Easing =
  | 'linear'
  | 'swing'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce';

export type EasingFunction = (p: number) => number;

export const easings = {
  linear: (p) => p,
  swing: (p) => 0.5 - Math.cos(p * Math.PI) / 2,
  easeIn: (p) => p * p,
  easeOut: (p) => p * (2 - p),
  easeInOut: (p) => (p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p),
} as Record<Easing, EasingFunction>;

let baseEasings = {} as Record<string, EasingFunction>;

['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach((name, i) => {
  baseEasings[name] = (p) => {
    return Math.pow(p, i + 2);
  };
});

baseEasings = {
  ...baseEasings,
  ...{
    Sine: function (p) {
      return 1 - Math.cos((p * Math.PI) / 2);
    },
    Circ: function (p) {
      return 1 - Math.sqrt(1 - p * p);
    },
    Elastic: function (p) {
      return p === 0 || p === 1
        ? p
        : -Math.pow(2, 8 * (p - 1)) *
            Math.sin((((p - 1) * 80 - 7.5) * Math.PI) / 15);
    },
    Back: function (p) {
      return p * p * (3 * p - 2);
    },
    Bounce: function (p) {
      let pow2;

      // 最大弹跳次数
      let bounce = 4;

      // 通过循环确定当前进度在第几次弹跳
      // 每次弹跳的范围是 (pow2 - 1) / 11
      while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {
        // 空循环，仅用于找到当前的弹跳阶段
        continue;
      }
      return (
        1 / Math.pow(4, 3 - bounce) -
        7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2)
      );
    },
  },
};

Object.keys(baseEasings).forEach(function (name) {
  const easeIn = baseEasings[name];
  easings[`easeIn${name}` as Easing] = easeIn;
  easings[`easeOut${name}` as Easing] = function (p) {
    return 1 - easeIn(1 - p);
  };
  easings[`easeInOut${name}` as Easing] = function (p) {
    return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2;
  };
});
