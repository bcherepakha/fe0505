class User {
    constructor(name, born) {
        this.name = name;
        this.born = born;
        this.type = 'user';
    }

    getAge() {
        const currentDate = new Date();

        return currentDate.getFullYear() - this.born.getFullYear();
    }

    getAccess() {
        return ['context'];
    }
}

console.dir( User );

const user = new User('Vasya', new Date('1996-08-13'));
const user1 = new User('Petya', new Date('1998-12-10'));

console.log( user1 );
console.log( user );
console.log( user.getAge() ); // LE = { this: user, arguments: {} }
console.log( user.getAccess() );

class Admin extends User {
    constructor(name, born) {
        super(name, born);

        this.type = 'admin';
    }

    getAccess() {
        const access = super.getAccess();

        access.push('admin');

        return access;
    }
}

const admin = new Admin('Admin', new Date('1991-10-15'));

console.log( admin );
console.log( admin.getAge() );
console.log( admin.getAccess() );
