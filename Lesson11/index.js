// примитивные

const n = 1; // code
const s = 'Hello!'; // code
const b = true; // code
const n1 = null; // code
const n2 = undefined; // code
const b1 = 123456789n; // code

// не примитивные

const o = {
    key: 'value'
};   // address --> code
const a = ['value'];   // address --> code
const f = function() {}; // address --> code
// const

console.log( o, typeof o );
console.log( a, typeof a );
console.dir( f );

f.key = 'function';
a.key = 'array';
a.do = function() {
    return this;
}

for (const key in a) {
    console.log({key, value: a[key]});
}

console.log( a.do() );


const animal = {
    name: 'animal',
    speed: 1,
    isRun: null,
    position: 0,
    changePosition() {
        // this.position = this.position + this.speed;
        this.position += this.speed;
        console.log(this.name, 'new position', this.position);
    },
    run() {
        console.log(this.name, 'start from position', this.position);
        this.isRun = setInterval(() => { this.changePosition(); }, 1000);
    },
    stop() {
        clearInterval(this.isRun);
        this.isRun = null;
        console.log(this.name, 'stop at position', this.position);
    }
}

animal.run();

setTimeout(() => { animal.stop(); }, 5000);

const rabbit = {
    name: 'rabbit',
    speed: 3,
    position: 5,
    __proto__: animal
}

console.log('created', rabbit.name );
console.log( rabbit );

console.log( rabbit.run );

rabbit.run(); // this = rabbit
setTimeout(() => { rabbit.stop(); }, 7000);
