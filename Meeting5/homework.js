// Метод every() проверяет, удовлетворяют ли все элементы массива условию,
// заданному в передаваемой функции.
function every(arr, condition) {

}

console.log( every([1, 2, 3, 4, 5], function(el) { return el < 3; }) ); // false
console.log( every([1, 2, 3, 4, 5], function(el) { return el > 0; }) ); // true

// Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
function join(arr, str) {

}

console.log( join(['Hello', 'world!'], ', ') ); // 'Hello, world!'
console.log( join( [1, 2, 3, 4, 'vasya'], ' - ' ) ); // '1 - 2 - 3 - 4 - vasya

// Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
function map( arr, transform) {

}

console.log( map( [1, 2, 3, 4], function (el, idx) { return el * idx; } ) ); // [0, 2, 6, 12]

// Метод some() проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
function some(arr, condition) {

}

console.log( some([1, 2, 3, 4, 5], function(el) { return el < 3; }) ); // true
console.log( some([1, 2, 3, 4, 5], function(el) { return el > 4; }) ); // true
console.log( some([1, 2, 3, 4, 5], function(el) { return el > 5; }) ); // false

// Метод reduce() применяет функцию reducer к каждому элементу массива (слева-направо),
// возвращая одно результирующее значение.
function reduce(arr, transform, initialValue) {

}

console.log( reduce(
        [1, 2, 3, 4],
        function (accumulator, el) { return el * accumulator; },
        1
    )
); // 24

console.log( reduce(
    [1, 2, 3, 4],
    function (accumulator, el) { return el + accumulator; },
    10
)
); // 20
