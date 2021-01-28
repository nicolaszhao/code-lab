export function fetchProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'iPhone', os: 'iOS', type: 'xs' });
    }, 400);
  });
}
