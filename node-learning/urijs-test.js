const URI = require('urijs');

const normalizeFilename = (uri, targetFilename, subPages = []) => {
  const filename = uri.filename(),
    oriUrl = uri.href();

  let pathname = uri.pathname();

  // 访问的是根路径，或者 filename 是 *.html，可以直接修改 filename -> targetPageName
  // 例如：[ http://example.com, http://example.com/index.html ] -> http://example.com/share.html
  if (pathname === '/' || /.+\.html$/.test(filename)) {
    return uri.filename(targetFilename).href();
  }

  // [ http://example.com/project, http://example.com/project/page ] -->
  // [ http://example.com/project/, http://example.com/project/page/ ]
  if (!/\/$/.test(pathname)) {
    pathname = uri.pathname(`${pathname}/`).pathname();
  }

  // 当没有传入 subPageNames 时，我们认为可以直接扩展当然 url 的 filename
  if (!subPages.length) {
    return uri.filename(targetFilename).href();
  }

  // 当 targetPageName 并没有出现在 subPageNames 中时，可以认为是无效的 targetPageName
  if (!subPages.includes(targetFilename.replace(/\.html$/, ''))) {
    return oriUrl;
  }
  
  const curPage = /([^/]+)\/$/.exec(pathname)[1];

  // 如果最后节点的子路由是子页面，将最后的子路由设置为 targetPageName
  if (subPages.includes(curPage)) {
    return uri.pathname(pathname.replace(/\/$/, '')).filename(targetFilename)
      .href();
  } else {
    return uri.filename(targetFilename).href();
  }
};

var urls = [];
urls[0] = 'http://example.com';
urls[1] = 'http://example.com#b';
urls[2] = 'http://example.com?a=1';
urls[3] = 'http://example.com?a=1#b';
urls[4] = 'http://example.com/';
urls[5] = 'http://example.com/#b';
urls[6] = 'http://example.com/?a=1';
urls[7] = 'http://example.com/?a=1#b';
urls[8] = 'http://example.com/project-name';
urls[9] = 'http://example.com/project-name#b';
urls[10] = 'http://example.com/project-name?a=1';
urls[11] = 'http://example.com/project-name?a=1#b';
urls[12] = 'http://example.com/project-name/';
urls[13] = 'http://example.com/project-name/#b';
urls[14] = 'http://example.com/project-name/?a=1';
urls[15] = 'http://example.com/project-name/?a=1#b';
urls[16] = 'http://example.com/project-name/index.html';
urls[17] = 'http://example.com/project-name/index.html#b';
urls[18] = 'http://example.com/prpject-name/index.html?a=1';
urls[19] = 'http://example.com/prpject-name/index.html?a=1#b';
urls[20] = 'http://example.com/project-name/page2';
urls[21] = 'http://example.com/project-name/page2#b';
urls[22] = 'http://example.com/project-name/page2?a=1';
urls[23] = 'http://example.com/project-name/page2?a=1#b';
urls[24] = 'http://example.com/project-name/page2.html';
urls[25] = 'http://example.com/project-name/page2.html#b';
urls[26] = 'http://example.com/project-name/page2.html?a=1';
urls[27] = 'http://example.com/project-name/page2.html?a=1#b';

urls.push('http://example.com/project-name/page2/');
urls.push('http://example.com/project-name/page2/#b');
urls.push('http://example.com/project-name/page2/?a=1');
urls.push('http://example.com/project-name/page2/?a=1#b');

console.log('------------- normalizeFilename(new URI(url), "share") ---------------');
urls.forEach((url, i) => {
  console.log(`${url} -> ${normalizeFilename(new URI(url), 'share')};`);
});
console.log('');

console.log('------------- normalizeFilename(new URI(url), "share", ["page2"]) ---------------');
urls.forEach((url, i) => {
  console.log(`${url} -> ${normalizeFilename(new URI(url), 'share', ['page2'])};`);
});
console.log('');

console.log('------------- normalizeFilename(new URI(url), "share.html", ["page2", "share"]) ---------------');
urls.forEach((url, i) => {
  console.log(`${url} -> ${normalizeFilename(new URI(url), 'share.html', ['page2', 'share'])};`);
});
console.log('');

console.log('has querys');

var uri = new URI('http://example.com/project-name/page2/?a=1'),
  querys = uri.query(true);

uri.href(normalizeFilename(uri, 'share'));
console.log(uri.href());