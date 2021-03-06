const foo = (barf) => {
  return new Promise((resolve, reject) => {
    if (barf) return reject(new Error('This is an error in foo'));
    return resolve();
  });
}

const bar = (err) => {
  console.log('bar has been called', err);
  throw new Error('OH NO');
}

foo()
.then((somedata) => {
  // perform some data transformation. Maybe it throws?
  throw new Error('SOMETHING IS VERY WRONG');
})
.then(() => {
  bar();
}, bar)

process.on('unhandledRejection', function(reason, p) {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
