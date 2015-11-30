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

foo(true)
.then(() => {
  console.log('foo has resolved');
  throw new Error('SOMETHING IS VERY WRONG');
  bar();
}, bar)
.catch(bar)
