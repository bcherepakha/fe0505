// Начальник цеха пригласил людей на совещание
// Каждый, кто входит в кабинет пожимает руки всем присутствующим
// Сколько человек зашло в кабинет, если известно, что всего произошло 120 рукопожатий.

// 1, 3, 6, 10, 15 ....
function getPeople(handshake) {
    let peoples = 0;

    for(let currentHandshake = 0; handshake > currentHandshake; peoples++, currentHandshake += peoples) {}

    console.log(`
        handshake = ${handshake};
        peoples = ${peoples};
    `);

    return peoples;
}

getPeople(1); // 1
getPeople(3); // 2
getPeople(6); // 3
getPeople(10); // 4
getPeople(15); // 5
getPeople(120); // ?
