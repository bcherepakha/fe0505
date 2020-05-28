// https://www.codewars.com/kata/555615a77ebc7c2c8a0000b8/train/javascript
function tickets(peopleInLine) {
    let cashboxSum = 0;
    let cashbox = [];
    const ticketPrice = 25;

    console.log(peopleInLine);
    for (let i=0; i < peopleInLine.length; i++) {
        const currentChange = peopleInLine[i] - ticketPrice,
            cashResult = currentChange <= cashboxSum ? removeCash(cashbox, currentChange) : {result: false};

        console.log({i, currentChange, cashboxSum, cashbox: [].concat(cashbox), cashResult});
        if (currentChange >= 0 && cashResult.result) {
            // продали
            cashboxSum += ticketPrice;
            cashbox = [].concat(cashResult.cashbox);
            cashbox.push(peopleInLine[i]);
        } else {
            // не продали
            console.log('NO', {cashbox, currentChange});
            return 'NO';
        }
    }

    function getBillIndexNearestToChange(cashbox, change) {
        let diff = Infinity;
        let currentIndex = -1;

        for(let i=0; i < cashbox.length; i++) {
            const currentDiff = change - cashbox[i];

            if (currentDiff >= 0 && diff > currentDiff) {
                diff = currentDiff;
                currentIndex = i;
            }
        }

        return currentIndex;
    }

    function removeCash(cashbox, change) {
        let currentChange = change;
        let result = true;
        const newCashbox = [].concat(cashbox);

        while (currentChange > 0) {
            const currentBillIndex = getBillIndexNearestToChange(newCashbox, currentChange);

            console.log({currentBillIndex, currentChange});
            if (currentBillIndex > -1) {
                // купюру откладываем
                const removeBills = newCashbox.splice(currentBillIndex, 1);
                currentChange -= removeBills[0];
            } else {
                return {result: false};
            }
        }

        return {result, cashbox: newCashbox};
    }

    console.log('YES', {cashbox});
    return 'YES';
}

console.log( tickets([25, 25, 50, 50]) ); // YES
console.log( tickets([25, 100]) ); // NO
console.log( tickets([25, 25, 50, 50, 100]) ); // NO
