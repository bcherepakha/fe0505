// sayHi = function
// Lexical Environment { a, n }
console.log({sayHi});

let a = 1;
let n = 'Anna';

function sayHi() {
    console.log(`Hi, ${n}`);
}

console.log({a, n, sayHi});
console.log('a', window.a);
console.log('n', window.n);
console.log('sayHi', window.sayHi);
console.log('name', window.name);

sayHi(); // LE = {  }

n = 'Ruslan';

sayHi(); // LE = {  }

// LE = { x = 2, n = 2, result = 4 }
// function pow(x, n) {
//     let result = 1;

//     for (let i=1; i<=n; i++) { // LE = { i: 2 }
//         result = result * x;
//     }

//     return result;
// }

// pow(x, n) = x * pow(x, n - 1);
function pow(x, n) {
    if (n < 0) {
        throw new Error('only positive n expected');
    }

    if (n === 0) {
        return 1;
    }

    // LE2 = { x: 2, n: 2 } => x * 2 => 4
    // LE3 = { x: 2, n: 1 } => x * 1 => 2
    // LE4 = { x: 2, n: 0 } => 1
    return x * pow(x, n - 1);
}

console.log( pow(2, 2)  ); // LE1 = { x: 2, n: 2 } => x * 2 => 4
console.log( pow(2, 3)  ); // LE1 = { x: 2, n: 3 } => x * 4 => 8
console.log( pow(3, 2)  );


// F(n) = F(n-1) + F(n - 2)
// F(1) = 3
// F(0) = 5
function fib(n) {
    if (n in fib.results) {
        return fib.results[n];
    }

    const result = fib(n - 1) + fib(n - 2);

    fib.results[n] = result;

    console.log({n, result});
    return fib(n - 1) + fib(n - 2);
}

fib.results = {
    0: 5,
    1: 3
};

console.log( fib(10) ); // LE = { n: 10 }

const arr = new Array(10).fill(0).map(function() { return getRandomInt(); });

console.log( new Array(100).fill(0) );
console.log( new Array(100).fill(0).map(function() { return getRandomInt(); }) );
console.log( new Array(100).fill(0).map(function() { return getRandomInt(); }) );

function getRandomInt() {
    return Math.round( Math.random() * 100 );
}

console.log( arr );

function inBetween(x, a, b) {
    return x >= a && x <= b;
}

// функцией высшего порядка
function inRange(a, b) {
    return function(x) {
        return x >= a && x <= b;
    }
}

const inRange1 = inRange(13, 50); // LE = {a: 13, b: 50, f}
const inRange2 = inRange(23, 50); // LEx = { a: 23, b: 50, f }

// console.log( arr.filter(function(x) { return inBetween(x, 13, 50); }) );
// arr (10) [74, 13, 32, 26, 12, 20, 17, 98, 38, 53]
// LE1 { x: 74 } => false
// LE2 { x: 13 } => true
console.log( arr.filter(inRange1) );

console.log( arr.filter(inRange2) );

console.log( arr.filter( inRange(33, 50) ) );
console.log( arr.filter(function(x) { return inBetween(x, 43, 53); }) ); // 43, 44, 45, 46, 47, 48, 49, 50

function Counter(formEl) {
    const moreBtn = formEl.querySelector(`[name="more"]`);
    const lessBtn = formEl.querySelector(`[name="less"]`);
    const valueEl = formEl.querySelector(`[name="value"]`);
    let value = 0;

    moreBtn.addEventListener('click', addMore);
    lessBtn.addEventListener('click', addLess);
    valueEl.addEventListener('input', changeValue);

    function changeValue() {
        const newValue = parseInt(valueEl.value, 10);

        if (!isNaN(newValue)) {
            value = newValue;
        }

        updateValue();
    }

    function addMore(event) {
        if (event) {
            event.preventDefault();
        }

        value++;
        updateValue();
    }

    function addLess(event) {
        if (event) {
            event.preventDefault();
        }

        value--;
        updateValue();
    }

    function updateValue() {
        if (value < 0) {
            value = 0;
        }

        valueEl.value = value;
    }

    function getValue() {
        return value;
    }

    getValue.more = addMore;
    getValue.less = addLess;

    return getValue;
}

const counters = Array
    .from(document.querySelectorAll('.counter'))
    .map(Counter);

console.log(counters);

console.log( counters[0]() );

counters[0].more();
counters[0].more();
counters[0].more();
counters[0].more();

console.log( counters[0]() );

console.log( counters[1]() );

counters[1].more();
counters[1].more();

console.log( counters[2]() );

counters[1].less();

console.log( counters[1]() );
