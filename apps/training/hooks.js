export function hooks() {
  const store = [];
  let cursor = 0;

  function rerender() {
    cursor = 0;
    // do ReactDOM.render(...);
    // render();
  }

  function _useState(initial) {
    store[cursor] = store[cursor] || initial;
    const currentCursor = cursor;

    function setState(value) {
      store[currentCursor] = value;
      rerender();
    }

    return [store[cursor++], setState];
  }

  function _useEffect(callback, depsArray) {
    const deps = store[cursor];
    const noDeps = !depsArray;
    const hasChangedDeps = deps
      ? !depsArray.every((dep, i) => dep === deps[i])
      : true;
    if (noDeps || hasChangedDeps) {
      callback();
      store[cursor] = depsArray;
    }
    cursor++;
  }

  return { _useState, _useEffect };
}
