// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (!newArray.includes(array[i])) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    let output = [];

    this.each(collection, (value) => {
      output.push(iteratee(value));
    });

    return output;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    let output = [];

    this.filter(collection, (value) => {
      if (!test(value)) {
        output.push(value);
      }
    });
    return output;
  }

  reduce(collection, iterator, accumulator) {
    let array = collection.slice();

    if (accumulator === undefined) {
      accumulator = array[0];
      array.shift();

      this.each(array, (value) => {
        return (accumulator = iterator(accumulator, value));
      });
    } else {
      this.each(array, (value) => {
        return (accumulator = iterator(accumulator, value));
      });
    }

    return accumulator;
  }

  every(collection, test) {
    return this.reduce(
      collection,
      (accumulator, item) => {
        if (test === undefined) {
          return true;
        }
        if (!accumulator) {
          return false;
        }
        accumulator = test(item);
        if (accumulator) {
          return true;
        }
      },
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(main) {
    let output = main;

    let objects = [...arguments].slice(1);

    let obj;

    this.each(objects, (value, key, objects) => {
      obj = objects[key];

      this.each(obj, (value, key, obj) => {
        output[key] = obj[key];
      });
    });

    return output;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let called = false;
    let output;

    return (val) => {
      if (!called) {
        called = true;
        output = func(val);
      }
      return output;
    };
  }

  memoize(func) {
    let cache = {};
    let output;
    let exists;

    return (val) => {
      let funcString = JSON.stringify(func(val));

      // // check if already in cache
      // if (cache != {}) {
      //   if (funcString in cache) {
      //     return cache[funcString];
      //   } else {
      //     output = func[val];
      //     cache[funcString] = output;
      //   }
      // } else {
      //     output = func[val];
      //     cache[funcString] = output;
      // }

      let value = JSON.stringify(val);

      if (cache.length > 0) {
        for (let key in cache) {
          if (key == value) {
            console.log("key" + key);
            console.log("return " + cache[key]);
          } else {
            output = func(val);
            cache[value] = output;
          }
        }
      } else {
        cache[value] = func(val);
        output = cache[value];
      }

      console.log(cache);
      return output;
    };
  }

  invoke(collection, functionOrKey) {
    let output = [];
    let result;

    this.each(collection, (val) => {
      if (typeof functionOrKey === "string") {
        result = val[functionOrKey].apply(val);
      } else if (typeof functionOrKey === "function") {
        result = functionOrKey.apply(val);
      }
      output.push(result);
    });
    return output;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
