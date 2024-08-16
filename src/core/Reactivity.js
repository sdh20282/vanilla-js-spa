const reactive = ({ target, callback }) => {
  const handler = {
    get: function (target, property, receiver) {
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], handler);
      }

      return Reflect.get(target, property, receiver);
    },
    set: function (target, property, value, receiver) {
      if (target[property] !== value) {
        Reflect.set(target, property, value, receiver);

        callback();
      }

      return true;
    }
  };

  const proxy = new Proxy(target, handler);

  return proxy;
}

export default reactive;