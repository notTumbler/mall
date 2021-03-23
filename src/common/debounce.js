export function debounce(fun, delay) {
  // 这里错用const,导致报错timer is read-only
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
      // console.log(this);
      // console.log(args);
    }, delay);
  };
}







