"use strict"
// v8

let a = -0.56e2; // number
let a1 = +Infinity; // number
let a2 = NaN; // number

let b = 'this "is" \'str\' ing'; // string
let b1 = "this 'is' \"string\" too"; // string
let b2 = `this is \`string\` also`; // string

let b3;

b3 = 'hello world!';

let c = true;   // boolean -> правда
let c1 = false; // boolean -> ложь

let d = null; // null

let e;
let e1 = undefined; // undefined

let f = 12345n; // bigInt

let c3 = 5 + 2 === 7; // true

console.log( c3 );

// -, +, *, /, %

console.log( 7 - 3 );
console.log( 5 / 2 );
console.log( 0.1 + 0.2 );
console.log( 0.1 + 0.2 === 0.3 );
console.log( (1 + 2) * 4 ); // 12

console.log( 'hello' + 'world' ); // 'helloworld'

console.log( true + false ); // 1 + 0 === 1
console.log( null + 4 ); // 0 + 4 === 4

let q;

q = +'';
console.log( q, typeof q ); // 0

q = +'12';
console.log( q, typeof q ); // 12

q = +'12a';
console.log( q, typeof q ); // NaN

q = +'1e2';
console.log( q, typeof q ); // 1 * 10**2 = 100

q = +true;
console.log( q, typeof q ); // 1

q = +false;
console.log( q, typeof q ); // 0

q = +null;
console.log( q, typeof q ); // 0

q = +undefined;
console.log( q, typeof q ); // NaN

console.log( 'hello = ' + 12 ); // -> to string

q = String(12);
console.log( q, typeof q ); // '12'

q = '' + true;
console.log( q, typeof q ); // 'true'

q = String(false);
console.log( q, typeof q ); // 'false'

q = '' + null;
console.log( q, typeof q ); // 'null'

q = '' + undefined;
console.log( q, typeof q ); // 'undefined'

// ===, ==, >, <, >=, <=, !=, !==, ! (not)
q = 2 === '2';
console.log( q, typeof q ); // 'false'

q = 2 === 5;
console.log( q, typeof q ); // 'false'

q = 2 === 2;
console.log( q, typeof q ); // 'true'

q = 2 == '2'; // 2 == 2
console.log( q, typeof q ); // 'true'

q = 'abcdef' === 'asdfghj';
console.log( q, typeof q ); // 'false'

q = '' == 0; // 0 == 0
console.log( q, typeof q ); // 'true'

q = 2 !== '2';
console.log( q, typeof q ); // 'true'

q = 2 != '2';
console.log( q, typeof q ); // 'false'

q = 'a' > 'b'; // 97 > 98
console.log( q, typeof q ); // 'false'

q = 'a' > 'B'; // 97 > 66
console.log( q, typeof q ); // 'true'

q = 'aaece' > 'aBvwvev'; // 97 > 66
console.log( q, typeof q ); // 'true'

q = !true; // false
q = !false; // true

q = !0; // 0 -> false => !0 -> !false -> true
console.log( q, typeof q ); // 'true'

q = !!0; // 0 -> false !0 -> true !!0 -> !(!0) -> !true -> false
console.log( q, typeof q ); // 'false'

q = !!''; // false

q = !!'a'; // true

q = !!5; // true

q = !!(-5);
console.log( q, typeof q ); // 'true'

q = !!null; // false
q = !!undefined; // false

// sum = ... function
function sum(a, b) {
    return a + 2 * b;
}

// console.log( 1 + 2*3 );
let r = sum(1, 3); // a = 1, b = 3, 1 + 2 * 3 => 7
console.log( r );

// console.log( 1 + 2*4 );
r = sum(9, 15); // a = 9, b = 15, 9 + 2 * 15 => 39
console.log(r);

// console.log( 2 + 2*3 );

function even_or_odd(number) {
    let mod = number % 2;
    let result;

    if (mod === 0) {
        result = 'Even';
    } else {
        result = 'Odd';
    }

    return result;
}

function even_or_odd(number) {
    return number % 2 ? "Odd" : "Even";
}

function convertUAH2USD(uah, uah2usd) {
    return (uah / uah2usd).toFixed(2);
}

function convertUSD2UAH(usd, usd2uah) {
    return (usd * usd2uah).toFixed(2);
}

console.log( '1', convertUAH2USD(10, 26.92260) );
console.log( '2', convertUSD2UAH(10, 26.92260) );

// && ( *, AND ) // return first "false" or last "true"

// true && true => true                 1 * 1 => 1
// true && false => false               1 * 0 => 0
// false && true => false               0 * 1 => 0
// false && false => false              0 * 0 => 0

// || ( +, OR ) // return first 'true' or last "false"
// true || true => true                 1 + 1 => 1
// true || false => true                1 + 0 => 1
// false || true => true                0 + 1 => 1
// false || false => false              0 + 0 => 0

function convert(currencyType, currencyValue, convertedType) {
    let result;

    if (currencyType === 'uah' && convertedType === 'usd') {
        result = convertUAH2USD(currencyValue, 26.92260);
    } else if (currencyType === 'usd' && convertedType === 'uah') {
        result = convertUSD2UAH(currencyValue, 26.92260);
    } else if (currencyType === 'uah' && convertedType === 'eur') {
        result = convertUAH2EUR(currencyValue, 29.1010);
    } else if (currencyType === 'eur' && convertedType === 'uah') {
        result = convertEUR2UAH(currencyValue, 29.1010);
    } else if (currencyType === 'usd' && convertedType === 'eur') {
        result = convertUAH2EUR(convertUSD2UAH(currencyValue, 26.92260), 29.1010);
    } else if (currencyType === 'eur' && convertedType === 'usd') {
        result = convertUAH2USD(convertEUR2UAH(currencyValue, 29.1010), 26.92260);
    }

    return currencyValue + ' ' + currencyType + ' converted to ' + result + ' ' + convertedType;
}

console.log( '3', convert('uah', 1000, 'usd') ); // 1000 uah converted to 37 usd
console.log( '4', convert('usd', 100, 'uah') );

function convertUAH2EUR(uah, uah2eur) {
    return (uah / uah2eur).toFixed(2);
}

function convertEUR2UAH(usd, eur2uah) {
    return (usd * eur2uah).toFixed(2);
}

console.log( '5', convert('uah', 1000, 'eur') ); // 1000 uah converted to 37 usd
console.log( '6', convert('eur', 100, 'uah') );

console.log( '7', convert('usd', 1000, 'eur') ); // 1000 uah converted to 37 usd
console.log( '8', convert('eur', 100, 'usd') );
