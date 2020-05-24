console.log("" + 0 + 2); // "02"
console.log("" - 2 + 0); // -2
console.log(true + false); // 1
console.log(9 / "3"); // 3
console.log("4" * "2"); // 8
console.log(7 + 5 + "px"); // "12px"
console.log("$" + 5 + 8); // "$58"
console.log("9" - 2); // 7
console.log("3px" - 2); // NaN
console.log(7 / 0); // Infinity
console.log("  -9  " + 5); // "  -9  5"
console.log("  -9  " - 5); // -14
console.log(null + 1); // 1
console.log(undefined + 2); // NaN
console.log(" \t \n" - 2); // -2

function wat() {
    if ("0") {
        console.log( 'Hello' );
    } else {
        console.log( 'By' );
    }
}

wat(); // 'Hello'
