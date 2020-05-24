// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
// 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home
// 4. В первых трех задачах добавить пользователю возможность ввести значения переменных.
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

function task1(n) {
    let i = 1;

    while (i <= n) {
        console.log(i);
        i++; // i = i + 1
    }
}

// task1(50);
// askNumberAndDo(task1);

function isSimple(n) {
    for(let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

function task2(n) {
    let i = 1;
    let result = '';

    while (i <= n) {
        if (isSimple(i)) {
            if (result.length > 0) {
                result += ', ';
            }

            result = result + i;
        }

        i++; // i = i + 1
    }

    console.log(result);
}

// task2(50);
// askNumberAndDo(task2);

function askNumber() {
    const answer = prompt('Get me some number, please'); // string or null
    const n = parseInt(answer, 10);

    return n;
}

function askNumberAndDo(caller) {
    const answer = prompt('Get me some number, please'); // string or null
    const n = parseInt(answer, 10);

    if (isNaN(n)) {
        // если не число
        console.error('This is not a number: ' + answer);
    } else {
        caller(n);
    }
}

function getNextSimple(n) {
    let next = n;

    do {
        next += 1; // next++
    } while( isSimple(next) !== true );

    return next;
}

function task5() {
    let i = 1;

    do {
        console.log(i);

        i = getNextSimple(i);
    } while (confirm('Will we continue?'));
}

// task5();
