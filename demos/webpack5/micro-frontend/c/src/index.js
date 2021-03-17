async function app() {
  const { hello } = await import('moduleA/hello');

  
  const { util } = await import('moduleB/util');
  
  hello('NZ');
  util('XXX~');
}

app();
