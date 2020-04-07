function compareVersions(a, b) {
  const toNumbers = (arr) => arr.map(n => +n);
  const compare = (a, b) => {
    const ret = a - b;
    return ret < 0 
      ? -1
      : (ret > 0 
        ? 1
        : 0);
  };

  let aVers = toNumbers(a.split('.'));
  let bVers = toNumbers(b.split('.'));
  return compare(aVers[0], bVers[0]) ||
    compare(aVers[1], bVers[1]) ||
    compare(aVers[2], bVers[2]);
}
