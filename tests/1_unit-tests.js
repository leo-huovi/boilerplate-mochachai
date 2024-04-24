const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', function () {
  suite('Basic Assertions', function () {
    // #1
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'This is an optional error description - e.g. null is null');
      assert.isNotNull(1, '1 is not null');
    });
    // #2
    test('#isDefined, #isUndefined', function () {
      assert.isUndefined(null, 'null is not undefined');
      assert.isUndefined(undefined, 'undefined IS undefined');
      assert.isDefined('hello', 'A string is not undefined');
    });
    // #3
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'null is falsey');
      assert.isOk("I'm truthy", 'A string is truthy');
      assert.isOk(true, 'true is truthy');
    });
    // #4
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'true is true');
      assert.isTrue(!!'double negation', 'Double negation of a truthy value is true');
      assert.isTrue({ value: 'truthy' }, 'Objects are truthy, but are not boolean values');
    });
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    // #5
    test('#equal, #notEqual', function () {
      assert.equal(12, '12', 'Numbers are coerced into strings with ==');
      assert.equal({ value: 1 }, { value: 1 }, '== compares object references');
      assert.equal(6 * '2', '12');
      assert.notEqual(6 + '2', '12');
    });
    // #6
    test('#strictEqual, #notStrictEqual', function () {
      assert.notStrictEqual(6, '6');
      assert.strictEqual(6, 3 * 2);
      assert.notStrictEqual(6 * '2', 12);
      assert.strictEqual([1, 'a', {}], [1, 'a', {}]);
    });
    // #7
    test('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, "The order of keys doesn't matter");
      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, 'The order of array elements does matter');
    });
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }
  suite('Comparisons', function () {
    // #8
    test('#isAbove, #isAtMost', function () {
      assert.isAbove('hello'.length, 4); // 'hello'.length = 5, 5 is above 4
      assert.isAtMost(1, 1); // 1 is at most 1
      assert.isAbove(Math.PI, 3); // PI is above 3
      assert.isAtMost(1 - Math.random(), 1); // 1 - Math.random() is at most 1
    });
    // #9
    test('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5); // 'world'.length = 5, 5 is at least 5
      assert.isAtLeast(2 * Math.random(), 0); // 2 * Math.random() is at least 0
      assert.isBelow(5 % 2, 2); // 5 % 2 = 1, 1 is below 2
      assert.isBelow(2 / 3, 1); // 2/3 is below 1
    });
    // #10
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5); // adjust the precision accordingly
      assert.approximately(weirdNumbers(0.2), 1, 0.8); // adjust the precision accordingly
    });
  });
  
  suite('Arrays', function () {
    // #11
    test('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split('')); // String.prototype.split() returns an array
      assert.isNotArray([1, 2, 3].indexOf(2)); // indexOf returns a number, not an array
    });
    // #12
    test('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul'); // "It's summer in July..."
      assert.include(backendLanguages, 'javascript'); // "JS is a backend language"
    });
  });
  
  suite('Strings', function () {
    // #13
    test('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4)); // A float is not a string
      assert.isString(process.env.PATH); // An env variable is a string (or undefined)
      assert.isString(JSON.stringify({ type: 'object' })); // JSON is a string
    });
    // #14
    test('String #include, #notInclude', function () {
      assert.include('Arrow', 'row'); // "'Arrow' contains 'row'"
      assert.notInclude('dart', 'queue'); // "But 'dart' doesn't contain 'queue'"
    });
    // #15
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople('John Doe', 35), regex); // Correctly formatted
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex); // Age not numeric
    });
  });
  
  suite('Objects', function () {
    // #16
    test('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings'); // Cars don't have wings
      assert.property(airlinePlane, 'engines'); // Planes have engines
      assert.property(myCar, 'wheels'); // Cars have wheels
    });
    // #17
    test('#typeOf, #notTypeOf', function () {
      assert.typeOf(myCar, 'object');
      assert.typeOf(myCar.model, 'string');
      assert.notTypeOf(airlinePlane.wings, 'string');
      assert.typeOf(airlinePlane.engines, 'array');
      assert.typeOf(myCar.wheels, 'number');
    });
    // #18
    test('#instanceOf, #notInstanceOf', function () {
      assert.notInstanceOf(myCar, Plane);
      assert.instanceOf(airlinePlane, Plane);
      assert.instanceOf(airlinePlane, Object);
      assert.notInstanceOf(myCar.wheels, String);
    });
  });
});