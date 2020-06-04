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

function getFamily(human) {
    const mother = getHuman(human.mother),
        father = getHuman(human.father),
        children = ANCESTRY_DATA.filter(function(child) {
            return child.mother === human.name || child.father === human.name;
        });

    return {
        human,
        mother,
        father,
        children,
        key: getFamilyKey(human)
    }
}

function getUniqFamily() {
    const data = ANCESTRY_DATA.map(getFamily),
        keys = {
            'null-null': true
        };

    return data.filter(function(family) {
        const familyKey = family.key,
            isUniq = !keys[familyKey];

        keys[familyKey] = true;

        return isUniq;
    });
}

console.log( 'getFamily', ANCESTRY_DATA.map(getFamily) );
console.log( 'getUniqFamily', getUniqFamily() );

function getDataWithFamilyKey() {
    return ANCESTRY_DATA.map(function(human) {
        return Object.assign({}, human, {
            familyKey: `${human.father}-${human.mother}`
        });
    });
}

function getFamilyKey(human) {
    return `${human.father}-${human.mother}`;
}

function getFamilys() {
    return ANCESTRY_DATA
        .reduce(
            function(families, human) {
                const familyKey = getFamilyKey(human);

                if (!Array.isArray(families[familyKey])) {
                    families[familyKey] = [];
                }

                families[familyKey].push(human);

                return families;
            },
            {}
        );
}

console.log( 'getDataWithFamilyKey', getDataWithFamilyKey() );
console.log( 'getFamilys', getFamilys() );
console.log( 'getFamilysConverted',
    Object.entries( getFamilys() )
        .filter(function(familyData) {
            const familyKey = familyData[0];

            return familyKey !== 'null-null';
        })
);

function getHuman(name) {
    return ANCESTRY_DATA.find(function(human) {
        return human.name === name;
    });
}

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

// среднюю разницу между в возрасте между родителями
function task2() {
    const ageDiff = ANCESTRY_DATA.map(function(human) {
        const mother = getHuman(human.mother),
            father = getHuman(human.father);

        if (mother && father) {
            return Math.abs(getAge(mother) - getAge(father));
        }

        return null;
    }).filter(function(ageDiff) { return ageDiff !== null; });

    return getArrAverage(ageDiff);
}

console.log('task2', task2() );
