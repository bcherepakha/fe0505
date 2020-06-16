function getMissingElement(superImportantArray) {
    // for (let currentNumber=0; currentNumber <=9; currentNumber++) {
    //     const isNumberInArray = superImportantArray.includes(currentNumber);

    //     if (!isNumberInArray) {
    //         return currentNumber;
    //     }
    //     console.log({currentNumber, isNumberInArray});
    // }

    // return 'All elements exists';
}

function getMissingElement(superImportantArray) {
    superImportantArray.sort();

    return superImportantArray.findIndex(function(number, idx) {
        return number !== idx;
    });
}

console.log( getMissingElement( [0,5,1,3,2,9,7,6,4] ) );

function MagicFunction(...args) {
    let argumentsArr = [];
    let sum = 0;

    function sumArguments(initialValue, args) {
        return args.reduce(
            // function(sum, el) {
            //     return sum + el;
            // },
            (sum, el) => sum + el,
            initialValue
        );
    }

    function next(...args) {
        console.log('next', args);

        // argumentsArr.push(...args);
        argumentsArr = argumentsArr.concat(args);
        sum = sumArguments(sum, args);

        console.log('args', args);
        console.log('argumentsArr', argumentsArr);
        console.log('sum', sum);

        return next;
    }

    next.valueOf = function() {
        return sum;
        // return sumArguments(0, argumentsArr);
    }

    // return next.call(this, ...args);
    return next.apply(this, args);
}

console.log('1', 0  == MagicFunction()                          );
console.log('2', 3  == MagicFunction(1, 2)                      );
console.log('3', 6  == MagicFunction(1, 3)(2)                   );
console.log('4', 6  == MagicFunction(1)(2, 3)                   );
console.log('5', 6  == MagicFunction(1)(2)(3)                   );
console.log('6', 38 == MagicFunction(1, 2)(3, 4, 5)(6)(7, 10)   );
