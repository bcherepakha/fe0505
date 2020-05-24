// В ваш подъезд вьехали новые жильцы, которые привезли с собой тараканов.
// Насекомые в поисках еды ползут по вентиляционной шахте.
// За час они поднимаются на 1м, но сразу после этого теряют равновесие и скатываются вниз на 0.5м
// Вопрос: сколько времени у вас есть на покупку ловушек для тараканов, если расстояние от вас до соседей 5м.

// (*) Напишите функцию, которая будет решать эту задачу в общем виде, для любых (speed, slowdown, mine),
// где mine - это высота шахты, speed - скорость таракана за час, slowdown - расстояние падения из-за усталости

function getTimeForInterceptCockroaches(mine, speed, slowdown) {
    let h = 0;
    let time = 0;
    let nextIntercept = h + speed;

    // if (nextIntercept >= mine) {
    //     console.log('дополз');
    //     return time + (mine - h) / speed;
    // } else {
    //     console.log('не дополз');

    //     h = nextIntercept - slowdown;
    //     time++;
    // }

    // for, while, do - while

    while (nextIntercept < mine) {
        console.log({h, nextIntercept, time});
        h = nextIntercept - slowdown;
        time++;
        nextIntercept = h + speed;
    }

    const result = time + (mine - h) / speed;

    console.log(`
        mine = ${mine};
        speed = ${speed};
        slowdown = ${slowdown};
        result = ${result};
    `);

    return result;
}

getTimeForInterceptCockroaches(.9, 1, .5);
getTimeForInterceptCockroaches(2, 1, .5);
getTimeForInterceptCockroaches(4, 1, .5);
getTimeForInterceptCockroaches(5, 1, .5);
