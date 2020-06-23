const p = new Promise(function (resolve, reject) {
  resolve([{
    key: 'data'
  }]);
  // reject(['this is error']);
});

const t = p
  .then(
    function onSuccess (data) {
      console.log('promise p done success', data);
    },
    function onError (error) {
      console.log('promise p failed', error);
    }
  )
  .then(function () { console.log('promise t done success'); });

console.log(p);
console.log(t);
