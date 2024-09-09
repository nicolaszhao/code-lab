export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $demo: (text: string) => string;
  }
}
