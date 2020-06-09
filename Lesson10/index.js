const user = {
    name: 'Vasya',
    age: 19,
    getName() {
        return this.name;
    },
    getYearOfBorn() {
        const d = new Date();

        return d.getFullYear() - this.age;
    }
};

console.log( user.getName() );
console.log( typeof user.getName );
console.log( user );

function createSecretHolder(secret) {
    const actions = {
        getSecret() {
            return secret;
        }
    };

    actions.setSecret = function setSecret(newSecret) {
        if (typeof newSecret === 'number' && isFinite(newSecret)) {
            secret = newSecret;

            return true;
        }

        return false;
    }

    return actions;
}

const obj = createSecretHolder(5); // LE = { secret, actions }

console.log(obj);

console.log( obj.getSecret() ); // 5;
obj.setSecret(8); // LE = { newSecret: 8 }
console.log( obj.getSecret() ); // 8;
console.log( obj.setSecret('hello') );
console.log( obj.getSecret() ); // 8;

function sum() {
    // console.log( 'context', this );
    console.log( 'arguments', arguments);

    // let sum = 0;

    // for (let i=0; i < arguments.length; i++) {
    //     sum = sum + arguments[i];
    // }

    // return sum;

    return [].reduce.call(
        arguments,
        function(sum, el, i) {
            return sum + el;
        },
        0
    );
}

console.log( sum(1, 2) ); // 3 LE = { arguments: [1, 2], this: undefined || window }
console.log( sum(1, 2, 3) ); // 6 LE = { arguments: [1, 2, 3], this: window }
console.log( sum(1, 2, 3, 4) ); // 10

const reduce = function (initialAccumulatorValue, action) {
    console.log('context', this);
    console.log('arguments', arguments);
    console.log('action', action);
    console.log('initialAccumulatorValue', initialAccumulatorValue);

    let accumulator = initialAccumulatorValue;

    for (const idx in arguments) {
        accumulator = action(accumulator, arguments[idx], idx, this);
    }

    return accumulator;
};

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

reduce.call(
    {0: 1, 1: 2, 2: 3, 3: 4},
    0,
    function(sum, el, i) {
        return sum + el;
    },
    3, 4, 5, 6, 7
);

reduce.apply(
    {0: 1, 1: 2, 2: 3, 3: 4},
    [
        0,
        function(sum, el, i) {
            return sum + el;
        },
        3, 4, 5, 6, 7
    ]
);

const mult = (...args) => {
    console.log('args', args);
    console.log('context', this);
    // console.log('arguments', arguments);

    return args.reduce(
        (acc, value) => acc * value,
        1
    );
};

mult.call({}, 1, 2, 3, 4, 5, 6);
