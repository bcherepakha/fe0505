function test1() {
    const a = +prompt('What is the number?'),
    result = a > 100 ? 'greate' : 'not greate';

console.log(result);

// if (a > 100) {
//     console.log('greate');
// } else {
//     console.log('not greate');
// }
}

function test2(year) {
    const currentYear = 2020;
    let result = (year > currentYear)
        ? 'this is future'
        : (year < currentYear)
            ? 'this is past'
            : 'this is current year';

    // if (year > currentYear) {
    //     result = 'this is future';
    // } else if (year < currentYear) {
    //     result = 'this is past';
    // } else {
    //     result = 'this is current year';
    // }

    return result;
}

// browser = 'IE', 'MS IE', 'IE8', 'IE9', 'IE10', 'IE11', 'IE12', 'Edge', 'Chrome', 'Firefox', 'Opera', 'Safary'
function test3(browser) {
    let result;

    switch(browser) {
        case 'IE': // browser === 'IE'
        case 'MS IE':
        case 'IE8':
            result = 'Hello, IE';
            break;
        case 'Edge': // browser === 'Edge'
            result = 'Hello, Edge';
            break;
        case 'Chrome':
        case 'Firefox':
        case 'Opera':
        case 'Safary':
            result = 'Hello, this is great browser!';
            break;
        default:
            result = 'Unknown browser!';
            break;
    }

    // if (browser === 'IE' || browser === 'MS IE' || browser === 'IE8') {
    //     result = 'Hello, IE';
    // } else if (browser === 'Edge') {
    //     result = 'Hello, Edge';
    // } else if (browser === 'Chrome') {
    //     result = 'Hello, this is great browser!';
    // }
}

function booleanToString(answer) {
    // if (answer) {
    //     return 'Yes';
    // }

    // return 'No';

    return answer ? 'Yes' : 'No';
}

/*
    Number
    String
    Boolean
    Null
    undefined
    BigInt
*/

// Array
const arr = [
    1,                              // 0
    'hello',                        // 1
    true,                           // 2
    null,                           // 3
    [1, 2, 3],                      // 4
    ['srt', 'str', 'str'],          // 5
    [1, 'str', null]                // 6
];

// console.log( arr[2] ); //true
// console.log( arr[4] ); // [1, 2, 3]
// console.log( arr[4][1] ); // 2
// console.log( arr[6][2] ); // null
// console.log( arr.length ); // 7

function arrTest1() {
    const result = [];
    let i = 0;
    let a;

    do {
        a = prompt('Enter number');

        if (a === null) {
            break;
        }

        a = parseInt(a, 10);

        console.log(a, isNaN(a), a < 100);

        if (!isNaN(a) && a < 100) {
            result[i] = a;
            i++;
        }
    } while (!isNaN(a) && a < 100);

    return result;
}

// const arr1 = arrTest1();

function getArrMin(arr) {
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let currentItem = arr[i];

        if (currentItem < min) {
            min = currentItem;
        }
    }

    return min;
}

function getArrMinIndex(arr) {
    let min = arr[0];
    let minIndex = 0;

    if (arr.length === 0) {
        return -1;
    }

    for (let i = 1; i < arr.length; i++) {
        let currentItem = arr[i];

        if (currentItem < min) {
            min = currentItem;
            minIndex = i;
        }
    }

    return minIndex;
}

// console.log( arr1, getArrMin(arr1) );
console.log( [5, 8, 12, 15, 3, 7, 6, 1], getArrMinIndex([5, 8, 12, 15, 3, 7, 6, 1]) );
