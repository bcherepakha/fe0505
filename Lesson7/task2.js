/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Maksym: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Maxim: getRandomBall(15, 80)
};

// Math.round  < .5, >= 0.5
// Math.random 0 ... 1
// min = 40, max = 70, 40 + 0...1 * (70 -40) = 40 + 0...30 = 40 ... 70
function getRandomBall(min = 0, max = 100) {
    return Math.round( min + Math.random() * (max - min) );
}

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл.
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему. (дома)
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга.
*/

console.log( 'Имя учащегося с максимальным количеством баллов: ', getLeader(grade).name );
console.log( 'максимальный балл: ', getLeader(grade).value );
console.log( 'средний балл: ', getAverage(grade) );
console.log( 'средний ученик: ', getAveragePeople(grade) );
console.log( 'учащихся с баллом ниже среднего: ', getPeopleWithMaxGrade(grade, getAverage(grade)) );
console.log( 'winners: ', getWinners(grade) );

function getLeader(grade) {
    let max = -Infinity;
    let leaderName;

    for (const name in grade) {
        if (grade[name] > max) {
            max = grade[name];
            leaderName = name;
        }
    }

    return {
        name: leaderName,
        value: max
    };
}

// function getAverage(grade) {
//     let sum = 0;
//     let count = 0;

//     for (const name in grade) {
//         sum += grade[name];
//         count++;
//     }

//     return sum / count;
// }

function getAverage(grade) {
    const values = Object.values(grade);
    // let sum = 0;

    // for (let i=0; i < values.length; i++) {
    //     sum = sum + values[i];
    // }

    // f(values[i], i, values);
    // values.forEach(function(el) {
    //     sum = sum + el;
    // });

    // f(acc, values[i], i, values)
    // acc = 0, el = 39 => 0 + 39 = 39
    // acc = 39, el = 90 => 39 + 90 = 129
    // acc = 129, el = 18 => 129 + 18 = 147
    const sum = values.reduce(
        function(acc, el) {
            return acc + el;
        },
        0
    );

    return sum / values.length;

    // console.log('values: ', Object.values(grade));
    // console.log('keys: ', Object.keys(grade));
    // console.log('entries: ', Object.entries(grade));
    // console.log('getEntries', getEntries(grade));
}

function getEntries(obj) {
    const result = [];

    for (const key in obj) {
        result.push(
            [ key, obj[key] ]
        )
    }

    return result;
}

// function getPeopleWithMaxGrade(grade, max) {
//     return Object
//         .keys(grade)
//         .filter(function(name) { return grade[name] < max; });
// }

function getPeopleWithMaxGrade(grade, max) {
    const result = [];

    for (const name in grade) {
        if (grade[name] < max) {
            result.push(name);
        }
    }

    return result;
}

function getWinners(grade) {
    const gamers = Object.keys(grade);

    // console.log(gamers);
    const winners = gamers.sort(function(name1, name2) {
        const value1 = grade[name1],
            value2 = grade[name2];

        // console.log({name1, name2, value1, value2, gamers});
        if (value1 > value2) {
            return value2 - value1; // < 0
        }

        if (value1 === value2) {
            return value2 - value1; // 0
        }

        if (value1 < value2) {
            return value2 - value1; // > 0
        }
    });

    winners.length = 3;

    return winners.map(function(name) {
        return {
            name,
            grade: grade[name]
        };
    });
}

function getAveragePeople(grade) {
    const averageValue = getAverage(grade);
    let diff = Infinity;
    let avaragePeopleName;

    for (const name in grade) {
        const currentDiff = Math.abs(grade[name] - averageValue);

        // console.log({name, currentDiff, diff, avaragePeopleName});
        if (currentDiff < diff) {
            diff = currentDiff;
            avaragePeopleName = name;
        }
    }

    return {name: avaragePeopleName, value: grade[avaragePeopleName], diff};
}
