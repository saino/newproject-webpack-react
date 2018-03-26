export default function defferPerform (func, wait) {
  let timer;

  return function (...args) {
    const context = this;

    timer = setTimeout(() => {
        clearTimeout(timer);
        func.apply(context, args);
      },
      wait
    );
  };
}
