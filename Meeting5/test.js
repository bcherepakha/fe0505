'use strict';

function getName() {
    return this.name;
}

const user = {
    name: 'Vasya',
    getName
};

const user2 = {
    name: 'Petya',
    getName
};

console.log(user);
console.log('getName 2', user.getName() );
console.log('getName 3', user2.getName() );

console.log( 'call', getName.call({ name: 'Tanya' }) );
console.log( 'call', getName.call(user) );

console.log( 'apply', getName.apply({ name: 'Tanya' }) );
console.log( 'apply', getName.apply(user) );

const bindedGetName = getName.bind( user2 );

console.log( 'bindedGetName', bindedGetName.call(user) );

function bind(func, context) {
    return function() {
        return func.call(context);
    }
}
