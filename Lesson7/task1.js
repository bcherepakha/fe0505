/**
 * Напишите код, выполнив задание из каждого пункта отдельной строкой:

    1.  Создайте пустой объект user.
    2.  Добавьте свойство name со значением Kato.
    3.  Добавьте свойство group со значением fe0303.
    4.  Измените значение свойства name на Julia.
    5.  Удалите свойство name из объекта.
    6.  Создайте копию обьекта user.
    7.  Проверьте, что созданный обьект не пустой.
    8.  Узнайте количество свойств в нем.
    9.  Измените в копии свойство name на Kato.
    10. Сравните свойства этих двух обьектов и придумайте структуру данных для отображения их разницы.
*/

const user = {
    'name': 'Ruslan',
    group: 'fe0505',
    1: 'this is one'
};

console.log( user['name'] ); // Ruslan
console.log( user.name ); // Ruslan
console.log( user['group'] ); // fe0505
console.log( user.group ); // fe0505
console.log( user[1] ); // 'this is one'
console.log( user['1'] ); // 'this is one'

user['name'] = 'Kato';
user.name = 'Kato';

console.log( user.name ); // Kato

user[5] = 'this is 5';
user.gender = 'male';

delete user[1];
delete user[5];
delete user.gender;

console.log('go to the object', user);

for (const key in user) {
    console.log({
        key: key,
        value: user[key]
    });
}

function getObjLength(obj) {
    let count = 0;

    for (const key in obj) {
        count++;
    }

    return count;
}

console.log( getObjLength(user) );

user.getLength = getObjLength;

console.log( user.getLength(user), user );
