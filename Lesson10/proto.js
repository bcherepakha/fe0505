const obj = {},
    arr = [],
    d = new Date;

console.log(obj, arr);
console.dir( d );

function User(name, born) {
    this.name = name;
    this.born = born;

    // this.__proto__ = User.prototype;
}

User.prototype.getAge = function() {
    const currentDate = new Date();

    return currentDate.getFullYear() - this.born.getFullYear();
};

console.dir( User );

const user = new User('Vasya', new Date('1996-08-13'));
const user1 = new User('Petya', new Date('1998-12-10'));

// {
//     name: 'Vasya',
//     born: new Date('1996-08-13'),
//     getAge() {
//         const currentDate = new Date();

//         return currentDate.getFullYear() - this.born.getFullYear();
//     }
// };

console.log( user1 );
console.log(user);
console.log( user.getAge() ); // LE = { this: user, arguments: {} }

const admin = {
    name: 'Admin',
    born: new Date('1991-10-15'),
};

admin.__proto__ = User.prototype;

console.log( admin );
console.log( admin.name );
console.log( admin.getAge() );
