let weekDayDivs = document.getElementsByClassName("week_day")
weekDayDivs = Array.from(weekDayDivs) // not array so need to converted
const weekPicker = document.querySelector("#week_picker")

function getTodayWeekNumberForInputWeek(today) {
    /*
    * get the format yyyy-Www (ex: 2024-W01) to set as default value for input week when web open
    */
    const currentYear = today.getFullYear() 
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    const startOfWeek = 1; // start at monday
    let weekNumber = String(
        Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() - startOfWeek + 1) / 7)
    );
    weekNumber = weekNumber.padStart(2, "0")

    return `${currentYear}-W${weekNumber}`;
}

function swapWeekDay(dayIdx) {
    /*
    * swap javascript weekday
    * from Sun Mon ... Sat -> Mon Tue ... Sun
    */
    if (dayIdx == 0) {
        dayIdx = 6
    } else {
        dayIdx -= 1
    }
    return dayIdx
}

function getDates(anchorDate) {
    /* 
    * get all dates in a week (Mon - Sun) anchored by anchorDate: Date()
    * anchorDate.getDate = day in month (1-31)
    * anchorDate.getDay  = day in week  (0-6) (Sun Mon ... Sat)
    */
    const anchorDayInMonth = anchorDate.getDate()
    let anchorDayInWeek = anchorDate.getDay()
    anchorDayInWeek = swapWeekDay(anchorDayInWeek)

    // calculate Monday from anchorDate
    const monday = anchorDayInMonth - anchorDayInWeek // int
    const mondayDate = new Date(anchorDate).setDate(monday) // date

    let daysInWeek = []
    let i
    for (i = 0; i < 7; i++) {
        let tempDate = new Date(mondayDate)
        tempDate.setDate(monday + i)
        const dateString = String(tempDate.getDate()).padStart(2, '0')
        const monthString = String(tempDate.getMonth() + 1).padStart(2, '0')
        daysInWeek.push(`${dateString}/${monthString}`)   
    }
    return daysInWeek
}

function getWeekDates(weekValue) {
    /*
    * 1st day of week (anchorDate) -> getDates
    * weekValue: value from input<week>
    */
    const [year, week] = weekValue.split('-W')
    const yearNum = parseInt(year, 10)
    const weekNum = parseInt(week, 10)
    const firstDayOfYear = new Date(yearNum, 0, 1)
    const firstDayOfWeek = new Date(firstDayOfYear)
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + (weekNum - 1) * 7 - (firstDayOfWeek.getDay() + 6) % 7)
    return getDates(firstDayOfWeek)

}

function showWeekDate(weekValue) {
    /*
    * to find 7 days contained the selected date and show
    */
    const daysInWeek = getWeekDates(weekValue)
    for (let idx in weekDayDivs) {
        weekDayDivs[idx].querySelector(".date").textContent = daysInWeek[idx]
    }
}

function removeWeekDayHighLight() {
    // remove current highlight div
    for (const weekDayDiv of weekDayDivs) {
        if (weekDayDiv.classList.contains("selected_day")) {
            weekDayDiv.classList.remove("selected_day")
            const borderDiv = weekDayDiv.querySelector(".line_border")
            borderDiv.style.backgroundColor = "black" // change back to black line
            break
        } 
    }
}

function highlightWeekDay(weekDayIdx) {
    removeWeekDayHighLight()
    console.log(weekDayIdx)
    const weekDayDiv = document.querySelector(`#week_day_${weekDayIdx}`)
    const border = document.querySelector(`#line_border_${weekDayIdx}`)
    weekDayDiv.classList.add("selected_day") // purple hightlight
    border.style.backgroundColor = "white" // change to white line
}


function hightlightToday() { 
    /*
    * only run when user open website 1st time
    * to hightlight TODAY + render all days in current week
    * otherwise, hightlight the day user clicked
    */
    const today = new Date()
    let currentDayIdx = today.getDay()
    currentDayIdx = swapWeekDay(currentDayIdx)
    currentDayIdx = String(currentDayIdx)
    const currentWeek = getTodayWeekNumberForInputWeek(today)
    weekPicker.value = currentWeek

    highlightWeekDay(currentDayIdx)

    // render days in current week
    // run when first time open web -> 
    showWeekDate(currentWeek)
}

function getSeletedWeek() {
    return weekPicker.value
}

function getSelectedYear() {
    return weekPicker.value.substring(2, 4) // last 2 digits of year
}

function getSelectedDay() { // dd/mm/yyyy
    const selectedYear = getSelectedYear()
    const selectedDayDiv = document.querySelector(".selected_day")
    const selectedDay = selectedDayDiv.querySelector(".date").textContent
    return `${selectedDay}/${selectedYear}`
}

export {hightlightToday, highlightWeekDay, getSelectedDay, weekPicker, showWeekDate, weekDayDivs}

