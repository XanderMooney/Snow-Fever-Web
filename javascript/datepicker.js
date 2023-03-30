let button = document.getElementById("dateButton");

let calenderExpanded = false;

const DAY_DEFAULT_COLOR = "#E1DCDC20";
const DAY_SELECTED_COLOR = "blue";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date();
let month = monthNames[date.getMonth()];

let userData = {
    progress: 0,
    selectedStartDay: -1,
    selectedEndDay: -1,
    selectedStartMonth: -1,
    selectedEndMonth: -1,
    selectedStartYear: -1,
    selectedEndYear: -1,
    selectedMonth: date.getMonth(),
    selectedYear: date.getFullYear(),
};

//#region mousemove stuff

function mouseCoordinates(event) {
    mousePosition = {
        x: event.clientX,
        y: event.clientY,
    }
}

let mousePosition = {
    x: 0,
    y: 0
}

document.onmousemove = mouseCoordinates;

//#endregion mousemove stuff

let swapsOccurred = 0;

button.addEventListener("click", function () {
    if (calenderExpanded) {
        return;
    }

    calenderExpanded = true;

    let date = new Date();

    let monthDayCount = getDaysInMonth(date.getMonth(), date.getFullYear());
    let day = date.getDay();

    console.log(monthDayCount + "days in this month (" + month + ")");

    // the calender container (will contain everything)
    let calenderContainer = document.createElement("div");
    calenderContainer.classList.add("calenderContainer");

    // monthContainer to contain all the days
    let year = document.createElement("div");
    year.innerText = userData.selectedYear;
    year.classList.add("year");

    // add month container to calender container
    calenderContainer.appendChild(year);

    // display the month name at the top
    let monthNameContainer = document.createElement("div");
    monthNameContainer.classList.add("monthNameContainer");

    // add month name onto the calender container
    calenderContainer.appendChild(monthNameContainer);

    //#region month controls

    let prevMonthButton = document.createElement("div");
    prevMonthButton.innerText = "<";
    prevMonthButton.classList = "monthButton prevMonthButton";
    prevMonthButton.addEventListener("click", function () {
        userData.selectedMonth--;
        if (userData.selectedMonth < 0) {
            userData.selectedMonth = 11;
            userData.selectedYear--;
        }
        fixMonth();
        if (userData.progress == 2) {
            console.log("highlighting days")
            highlightDays()
        }
    })
    monthNameContainer.appendChild(prevMonthButton);

    let monthName = document.createElement("div");
    monthName.classList.add("monthName");
    monthName.innerText = monthNames[userData.selectedMonth];
    monthNameContainer.appendChild(monthName);

    let nextMonthButton = document.createElement("div");
    nextMonthButton.innerText = ">";
    nextMonthButton.classList = "monthButton nextMonthButton";
    nextMonthButton.addEventListener("click", function () {
        userData.selectedMonth++;
        if (userData.selectedMonth > 11) {
            userData.selectedMonth = 0;
            userData.selectedYear++;
        }
        fixMonth();
        if (userData.progress == 2) {
            console.log("highlighting days")
            highlightDays()
        }
    })
    monthNameContainer.appendChild(nextMonthButton);

    //#endregion month controls

    // monthContainer to contain all the days
    let monthContainer = document.createElement("div");
    monthContainer.classList.add("monthContainer");

    // add month container to calender container
    calenderContainer.appendChild(monthContainer);

    let confirmButton = document.createElement("div");
    confirmButton.classList.add("confirmButton");
    confirmButton.style.display = "none"; // hide button by default
    confirmButton.innerText = "Confirm Days";

    confirmButton.addEventListener("click", function () {
        calenderContainer.remove();
        calenderExpanded = false;
        userData.progress = 0;
        displayDifferences();
        return;
    })

    calenderContainer.appendChild(confirmButton);

    // generate day boxes
    generateDays(monthDayCount, monthContainer, confirmButton);

    document.body.appendChild(calenderContainer);
    calenderContainer.style.left = mousePosition.x + "px";
    calenderContainer.style.top = mousePosition.y + "px";
})

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
};

function fixMonth() {
    let monthContainer = document.getElementsByClassName("monthContainer")[0];
    monthContainer.innerHTML = "";
    document.getElementsByClassName("monthName")[0].innerText = monthNames[userData.selectedMonth];
    document.getElementsByClassName("year")[0].innerText = userData.selectedYear;

    let monthDayCount = getDaysInMonth(userData.selectedMonth, date.getFullYear());

    let confirmButton = document.getElementsByClassName("confirmButton")[0]

    generateDays(monthDayCount, monthContainer, confirmButton);
}

function generateDays(x, y, z) {
    for (let i = 1; i < x + 1; i++) {
        console.log("rendering day " + i);

        let day = document.createElement("div");
        day.classList.add("dayBox");
        day.id = i;
        day.innerText = i;

        day.addEventListener("click", function () {
            if (userData.progress == 0) {
                this.style.backgroundColor = "blue";
                userData.selectedStartDay = parseInt(this.id);
                userData.selectedStartMonth = userData.selectedMonth;
                userData.selectedStartYear = userData.selectedYear;
                userData.progress++;
            } else if (userData.progress == 1) {
                if (userData.selectedStartDay == parseInt(this.id) && userData.selectedStartMonth == userData.selectedMonth && userData.selectedStartYear == userData.selectedYear) {
                    //return; // dont count the same day!
                }

                userData.selectedEndDay = parseInt(this.id);
                userData.selectedEndMonth = userData.selectedMonth;
                userData.selectedEndYear = userData.selectedYear;

                validateUserData();

                //let monthDayCount = getDaysInMonth(userData.selectedMonth, userData.selectedYear);

                highlightDays();

                userData.progress++;
                z.style.display = "block";
            } else if (userData.progress == 2) {

                let monthDayCount = getDaysInMonth(userData.selectedMonth, userData.selectedYear);

                for (let i2 = 1; i2 < monthDayCount + 1; i2++) {
                    document.getElementById(i2).style.backgroundColor = DAY_DEFAULT_COLOR;
                }

                userData.selectedStartDay = parseInt(this.id);
                userData.selectedStartMonth = userData.selectedMonth;
                userData.selectedStartYear = userData.selectedYear;

                userData.selectedEndDay = -1;
                userData.selectedEndMonth = -1;
                userData.selectedEndYear = -1;

                this.style.backgroundColor = "blue";
                userData.progress = 1;
                swapsOccurred = 0;
                z.style.display = "none";
            }
        });

        y.appendChild(day);
    }
}

function highlightDays() {
    console.log("swapsOccured: " + swapsOccurred);
    if (userData.selectedStartYear == userData.selectedEndYear) {
        if (userData.selectedMonth < userData.selectedStartMonth || userData.selectedMonth > userData.selectedEndMonth) {
            console.log("returned on 1: outside months in same year");
            return; // dont draw, we are out of our months to display
        }
    }
    else if (userData.selectedYear < userData.selectedStartYear || userData.selectedYear > userData.selectedEndYear) {
        console.log("returned on 2: outside years");
        console.log("start year: " + userData.selectedStartYear + " end year: " + userData.selectedEndYear);
        return; // dont draw, we are outside of the years our selected dates go to
    }
    else if (userData.selectedStartYear < userData.selectedEndYear) {
        if (userData.selectedMonth != userData.selectedEndMonth && userData.selectedMonth != userData.selectedStartMonth && (userData.selectedMonth < userData.selectedStartMonth || userData.selectedMonth > userData.selectedEndMonth)) {
            console.log("returned on 1: outside months in differing years");
            console.log("start month: " + userData.selectedStartMonth + " end month: " + userData.selectedEndMonth);
            console.log("selected month: " + userData.selectedMonth);
            return; // dont draw, we are out of our months to display
        }
    }

    let start = 0;
    let end = 0;

    if (userData.selectedYear != userData.selectedStartYear && userData.selectedYear != userData.selectedEndYear) {
        console.log("drawing on 1: draw full month");
        start = 1;
        end = getDaysInMonth(userData.selectedMonth, userData.selectedYear) + 1;
    }
    else if (userData.selectedMonth != userData.selectedStartMonth && userData.selectedMonth != userData.selectedEndMonth) {
        console.log("drawing on 2: draw full month");
        start = 1;
        end = getDaysInMonth(userData.selectedMonth, userData.selectedYear) + 1;
    }
    else if (userData.selectedStartMonth == userData.selectedEndMonth) {
        console.log("drawing on 3: draw start day to end day");
        start = userData.selectedStartDay;
        end = userData.selectedEndDay + 1;
    }
    else if (userData.selectedMonth == userData.selectedStartMonth) {
        console.log("drawing on 4: draw from the start day to the end of the month");
        start = userData.selectedStartDay;
        end = getDaysInMonth(userData.selectedMonth, userData.selectedYear) + 1;
    }
    else if (userData.selectedMonth == userData.selectedEndMonth) {
        console.log("drawing on 5: draw from the start of the month to the end day");
        start = 1;
        end = userData.selectedEndDay + 1;
    }
    else {
        console.log("panic!")
    }

    // draw the stuff

    for (let i2 = start; i2 < end; i2++) {
        document.getElementById(i2).style.backgroundColor = DAY_SELECTED_COLOR;
    }

    console.log("start day: " + userData.selectedStartDay + " end day: " + userData.selectedEndDay);
    console.log("start : " + start + " end: " + end);
}


function validateUserData() {
    swapsOccurred++;
    if (userData.selectedStartYear == userData.selectedEndYear) {
        if (userData.selectedStartDay > userData.selectedEndDay) {
            if (userData.selectedStartMonth <= userData.selectedEndMonth) {
                let _ = userData.selectedEndDay;
                userData.selectedEndDay = userData.selectedStartDay;
                userData.selectedStartDay = _;
                console.log("SWAPPED DAYS");
                return;
            }
            else {
                // flip months around
                let _ = userData.selectedEndMonth;
                userData.selectedEndMonth = userData.selectedStartMonth;
                userData.selectedStartMonth = _;
                console.log("SWAPPED MONTHS");
                // same for days
                _ = userData.selectedEndDay;
                userData.selectedEndDay = userData.selectedStartDay;
                userData.selectedStartDay = _;
                console.log("SWAPPED DAYS");
                return;
            }
        }
        else if (userData.selectedEndMonth < userData.selectedStartMonth) {
            // swap months
            let _ = userData.selectedEndMonth;
            userData.selectedEndMonth = userData.selectedStartMonth;
            userData.selectedStartMonth = _;
            console.log("SWAPPED MONTHS");

            // flip days round
            _ = userData.selectedEndDay;
            userData.selectedEndDay = userData.selectedStartDay;
            userData.selectedStartDay = _;
            console.log("SWAPPED DAYS");
            return;
        }
    } else if (userData.selectedStartYear > userData.selectedEndYear) {
        // how could you start after youve ended? flip years!

        let _ = userData.selectedEndYear;
        userData.selectedEndYear = userData.selectedStartYear;
        userData.selectedStartYear = _;
        console.log("SWAPPED YEARS");

        // to avoid dec of 2023 to jan of 2024 becoming jan of 2023 to dec of 2024
        // swap months
        _ = userData.selectedEndMonth;
        userData.selectedEndMonth = userData.selectedStartMonth;
        userData.selectedStartMonth = _;
        console.log("SWAPPED MONTHS");


        // flip days round
        _ = userData.selectedEndDay;
        userData.selectedEndDay = userData.selectedStartDay;
        userData.selectedStartDay = _;
        console.log("SWAPPED DAYS");
        return;
    }
    swapsOccurred--;
}

function displayDifferences() {
    let display = document.getElementById("displayText");

    display.innerHTML += "the start: " + monthNames[userData.selectedStartMonth] + " " + userData.selectedStartDay + " of " + userData.selectedStartYear + "</br>";
    display.innerHTML += "the end: " + monthNames[userData.selectedEndMonth] + " " + userData.selectedEndDay + " of " + userData.selectedEndYear + "</br>";

    let date1 = new Date(userData.selectedStartMonth + "/" + userData.selectedStartDay + "/" + userData.selectedStartYear);
    let date2 = new Date(userData.selectedEndMonth + "/" + userData.selectedEndDay + "/" + userData.selectedEndYear);


    const utc1 = Date.UTC(userData.selectedStartYear, userData.selectedStartMonth, userData.selectedStartDay);
    const utc2 = Date.UTC(userData.selectedEndYear, userData.selectedEndMonth, userData.selectedEndDay);

    diffDays = Math.floor((utc2 - utc1) / 86400000);
    // 86400000 is milliseconds in a day aka (1000 * 60 * 60 * 24)

    //(diffDays != 0 ? "s" : "") adds an s if days are over 1
    display.innerHTML += (diffDays + 1) + " day" + (diffDays != 0 ? "s" : "") + " selected";
}
