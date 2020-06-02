console.log(ANCESTRY_DATA);
/*
    {
      "name": "Carolus Haverbeke",
      "sex": "m",
      "born": 1832,
      "died": 1905,
      "father": "Carel Haverbeke",
      "mother": "Maria van Brussel"
    }
*/

function getAge(human) {
    return human.died - human.born;
}

function getCentury(human) {
    return Math.ceil(human.died / 100);
}

function getArrAverage(arr) {
    return arr.reduce(
        function(sum, el) {
            // sum = 0, el = 1 => 1
            // sum = 1, el = 2 => 3
            // sum = 3, el = 3 => 6
            return sum + el;
        },
        0
    ) / arr.length; // 6 / 3 => 2
}

console.log( getArrAverage([1, 2, 3]) ); // 2

// средний возраст людей для каждого из столетий.
// Назначаем столетию людей: `Math.ceil(person.died / 100)`.
function task4() {
    const centuries = ANCESTRY_DATA
        .reduce(
            function(centuries, human) {
                const currentCenturie = getCentury(human);
                const currentAge = getAge(human);

                // {20: [73, 80], 18: [41]}
                console.log(centuries, currentCenturie, currentAge, human);

                // currentCenturie[currentCenturie] === undefined

                if (!Array.isArray(centuries[currentCenturie])) {
                    centuries[currentCenturie] = [];
                }

                centuries[currentCenturie].push(currentAge);

                return centuries;
            },
            {}
        );

    for (const centurie in centuries) {
        centuries[centurie] = getArrAverage(centuries[centurie]);
    }

    return centuries;
}

console.log('task4', task4() );
