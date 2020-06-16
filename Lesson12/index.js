function calculate(...args) {

    function sumOfArray(...arr) {
        return arr.reduce((sum, el) => sum + el, 0);
    }

    // return function(...added) {
    //     return sumOfArray(...args) + sumOfArray(...added);
    // }

    return sumOfArray.bind(this, ...args);
}

const add1 = calculate(1);
console.log( add1(1, 2, 3) ); // 1 + 1, 2, 3 = 7
console.log( add1(1) ); // 2

function sumOfArray(...arr) {
    console.log(arr);
    return arr.reduce((sum, el) => sum + el, 0);
}

const add2 = sumOfArray.bind(null, 1, 2);

console.log( add2(5) );
console.log( add2(5, 2) );
console.log( add2(5, 2, 6) );


function hello(firstArg, secondArg, ...restArg) {
    console.log(firstArg); // 1
    console.log(secondArg); // 2
    console.log(restArg); // [3, 4, 5, 6, 7]
}

hello(1, 2, 3, 4, 5, 6, 7); // undefined(5, 5)


function createSumHelper(...args) {
    console.log('createSumHelper', args);
    const a = args;

    function sum(...args) {
        console.log('sum', args);

        return [...args, ...a];
    }

    return sum;
}

const sumHelper = createSumHelper(1, 2, 3);
console.log( sumHelper(4, 5, 6) );

console.log( createSumHelper(4, 5, 12)(7, 8, 9) );
