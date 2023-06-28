function memo(func) {
  const cache = {};
  const calls = [];

  return function(...args) {
    const key = args;

    if (cache[key]) {
      console.log('Received from cache');
      const index = calls.indexOf(key);
      if (index !== -1) {
        calls.splice(index, 1);
      }
      calls.unshift(key);

      return cache[key];
    }
    const result = func(...args);
    cache[key] = result;
    calls.unshift(key);
    if (calls.length > 10) {
      const oldestKey = calls.pop();
      delete cache[oldestKey];
    }

    console.log('New call');
    return result;
  };
}
function callback(phone) {
  return 'tel: ' + phone;
}

const newMemo = memo(callback);
console.log(newMemo('0 800 300 466')); // calculated
console.log(newMemo('466')); // cached
console.log(newMemo('466'));
console.log(newMemo('(061) 222-14-52'));
console.log(newMemo('0 800 400 111'));
console.log(newMemo('0 800 400 007'));
console.log(newMemo('050 462 0004')); // calculated
console.log(newMemo('380 500 400 111')); // cached
console.log(newMemo('0 800 300 466'));
console.log(newMemo('0 800 355 111'));
console.log(newMemo('0 800 900 11'));
console.log(newMemo('111'));
console.log(newMemo('112'));
console.log(newMemo('0 800 300 466'));
