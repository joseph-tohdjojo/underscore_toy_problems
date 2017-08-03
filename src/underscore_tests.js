/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(!n) {
      return array[0];
    } else if(n > array.length) {
      return array;
    } else {
      var i;
      var newArr = [];

      for(i = 0; i < n; i++) {
        newArr.push(array[i]);
      }

      return newArr;
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(!n) {
      return array[array.length - 1];
    } else if(n > array.length) {
      return array;
    } else {
      var i;
      var newArr = [];

      for(i = array.length - 1; i > array.length - n - 1; i--) {
        newArr.unshift(array[i]);
      }

      return newArr;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      var i,
          newArr = [];

      for(i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      var key;

      for(key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    var i;

    for (i = 0; i < array.length; i++) {
      if(target === array[i]) {
        return i;
      }
    }

    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var i,
        newArr = [];

    for (i = 0; i < collection.length; i++) {
      if(iterator(collection[i])) {
        newArr.push(collection[i]);
      }
    }

    return newArr;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var i,
        newArr = [];

    for (i = 0; i < collection.length; i++) {
      if(!iterator(collection[i])) {
        newArr.push(collection[i]);
      }
    }

    return newArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var i,
        newArr = [];

    for (i = 0; i < array.length; i++) {
      if(newArr.indexOf(array[i]) < 0) {
        newArr.push(array[i]);
      }
    }

    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var i,
        newArr = [];

    for (i = 0; i < array.length; i++) {
      newArr.push(iterator(array[i]));
    }

    return newArr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var i,
        newArr = [];

    for (i = 0; i < array.length; i++) {
      newArr.push(array[i][propertyName]);
    }

    return newArr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var i,
        newArr = [];

    for (i = 0; i < list.length; i++) {
      if(typeof methodName === 'string') {
        newArr.push(list[i][methodName](args));
      } else {
        newArr.push(methodName.call(list[i], args));
      }
    }

    return newArr;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var i,
        prevValue = 0,
        newArr = [];

    for (var i = 0; i < collection.length; i++) {
      if(i === 0 && initialValue !== undefined) {
        prevValue = iterator(initialValue, collection[i]);
      } else {
        prevValue = iterator(prevValue, collection[i]);
      }
    }

    return prevValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var i,
        key;

    if(Array.isArray(collection)) {
      for (i = 0; i < collection.length; i++) {
        if(collection[i] === target) {
          return true;
        }
      }
    } else {
      for(key in collection) {
        if(collection[key] === target) {
          return true;
        }
      }
    }

    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var i,
        key;

    if(typeof iterator !== 'function') {
      for (i = 0; i < collection.length; i++) {
        if(!collection[i]) {
          return false;
        }
      }
    } else if(Array.isArray(collection)) {
      for (i = 0; i < collection.length; i++) {
        if(!iterator(collection[i])) {
          return false;
        }
      }
    } else {
      for(key in collection) {
        if(!iterator(collection[i])) {
          return false;
        }
      }
    }

    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var i,
        key;

    if(typeof iterator !== 'function') {
      for (i = 0; i < collection.length; i++) {
        if(collection[i]) {
          return true;
        }
      }
    } else if(Array.isArray(collection)) {
      for (i = 0; i < collection.length; i++) {
        if(iterator(collection[i])) {
          return true;
        }
      }
    } else {
      for(key in collection) {
        if(iterator(collection[i])) {
          return true;
        }
      }
    }

    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var i,
        key,
        newObj = {};

    for (i = 0; i < arguments.length; i++) {
      for(key in arguments[i]) {
        newObj[key] = arguments[i][key];
      }
    }

    return newObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var i,
        key,
        newObj = {};

    for (i = 0; i < arguments.length; i++) {
      for(key in arguments[i]) {
        if(!newObj.hasOwnProperty(key)) {
          newObj[key] = arguments[i][key];
        }
      }
    }

    return newObj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var val,
        called;
    return function() {
      if(!called) {
        val = func();
        called = !called;
      }

      return val;
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var vals = {};

    return function(x) {
      if(!vals[x]) {
        vals[x] = func(x);
      }
      return vals[x];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var i,
        argsArr = [];

    for(i = 0; i < arguments.length; i++) {
      argsArr.push(arguments[i]);
    }

    argsArr.splice(0, 2);

    setTimeout(function() {
      func.apply(null, argsArr);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var i;
    var shuffledArr = [];
    var newArr = array;

    for(i = 0; i < array.length; i++) {
      var randomNum = Math.floor(Math.random() * (newArr.length - i))
      shuffledArr.push(newArr.splice(randomNum, 1));
    }

    return shuffledArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var i,
        undefines = 0;

    for (i = 0; i < collection.length; i++) {
      if(!collection[i]) {
        collection.splice(i, 1);
        undefines++;
      }
    }

    bubbleSort(collection);

    if(undefines > 0) {
      for (i = 0; i < undefines; i++) {
        collection.push(undefined);
      }
    }

    return collection;

    function bubbleSort(a) {
      var swapped;
      do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
          if (a[i] > a[i+1]) {
            var temp = a[i];
            a[i] = a[i+1];
            a[i+1] = temp;
            swapped = true;
          }
        }
      } while (swapped);
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var i;

    result = [];

    for (i = 0; i < nestedArray.length; i++) {
      if(Array.isArray(nestedArray[i])) {
        
      }
    }
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
