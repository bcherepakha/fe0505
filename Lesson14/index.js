const data = {
  result: 'hello, "world"!',
  error: null,
  a: 8,
  b: 9,
  hello: {
    a: [1, 2, 3, 4, 5, 6],
    w: 'world'
  }
};

// const result = data.result;
// const dataError = data.error;
// const rest = {
//  a: data.a,
//  b: data.b
// }
// const first = data.hello.a[0];
// allRest = data.hello.a.slice(2);

const {result, error: dataError, hello: { a: [first, , ...allRest] }, ...rest} = data;


console.log(data);

console.log(JSON.stringify(data));

const str = 'hello, world';

console.log(str, str.length);
console.log(JSON.stringify(str), JSON.stringify(str).length);

const d = document.querySelector('#test');

console.log(d.dataset);
console.log(d.getAttribute('data-class'));
