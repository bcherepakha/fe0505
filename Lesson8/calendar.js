const calendarEl = document.querySelector('.calendar'),
    dayNumbersEl = calendarEl.querySelector('.calendar__day-numbers'),
    currentDay = new Date(),
    currentMonth = currentDay.getMonth(),
    currentYear = currentDay.getFullYear(),
    lastDayOfMonth = getLastDateOfMonth(currentYear, currentMonth),
    days = generateDays(new Date(currentYear, currentMonth, 1), lastDayOfMonth);

function getLastDateOfMonth(year, month) {
    const d = new Date(year, month + 1, 0);

    return d;
}

function createDay(dayNumber, additionalClass) {
    const el = document.createElement('li');

    el.innerText = dayNumber.toString();
    // el.className = 'calendar__day';

    el.classList.add('calendar__day');

    if (additionalClass) {
        // el.className += ' ' + additionalClass;
        el.classList.add(additionalClass);
    }

    return el;
}

function generateDays(startDay, endDay) {
    const days = [],
        firstDay = startDay.getDay(), // Sun - 0, Mon - 1, Tue - 2, Wed - 3, Thu - 4, Fri - 5, Sat - 6
        lastDay = endDay.getDay(),
        firstShift = (7 + firstDay - 1) % 7,
        lastShift = (7 - lastDay) % 7;

    for (let shift = 0; shift < firstShift; shift++) {
        const d = new Date(startDay);

        d.setDate( d.getDate() - firstShift + shift);

        days.push(
            createDay(d.getDate(), 'calendar__day--not-in-month')
        );

    }

    for (let day = startDay; day <= endDay; day = new Date(day), day.setDate(day.getDate() + 1)) {
        days.push(
            createDay(day.getDate())
        );
    }

    for (let shift = 0; shift < lastShift; shift++) {
        const d = new Date(endDay);

        d.setDate( d.getDate() + shift + 1);

        days.push(
            createDay(d.getDate(), 'calendar__day--not-in-month')
        );

    }

    return days;
}

function fillCalendarBody(calendarBody, days) {
    calendarBody.innerText = '';

    for (let i=0; i < days.length; i++) {
        calendarBody.append(days[i]);
    }
}

fillCalendarBody(dayNumbersEl, days);

console.log(calendarEl);
console.dir(currentDay);
console.log({currentMonth, currentYear, lastDayOfMonth});
console.log( createDay(10) );
console.log( days );
console.log( dayNumbersEl );
