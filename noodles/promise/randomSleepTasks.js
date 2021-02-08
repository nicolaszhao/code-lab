function start(id) {
  start.tasks = start.tasks || [];

  const tasks = start.tasks;

  tasks.push(() => execute(id));

  clearTimeout(start.timer);
  start.timer = setTimeout(() => {
    tasks.reduce((prev, next) => prev.then(next), Promise.resolve());
  });
}

function sleep() {
  const duration = Math.floor(Math.random() * 500);
  return new Promise(resolve => setTimeout(resolve, duration));
}

function execute(id) {
  return sleep().then(() => {
    console.log('id', id);
  });
}

for (let i = 0; i < 5; i++) {
  start(i);
}
