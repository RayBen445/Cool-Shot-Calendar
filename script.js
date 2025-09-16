// --- DOM ELEMENT REFERENCES ---
const monthYearHeader = document.getElementById('month-year-header');
const monthPicker = document.getElementById('month-picker');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const todayBtn = document.getElementById('today-btn');
const calendarDays = document.getElementById('calendar-days');

// --- DATE SELECTOR POPUP ELEMENTS ---
const dateSelector = document.getElementById('date-selector');
const monthSelect = document.getElementById('month-select');
const yearInput = document.getElementById('year-input');
const goToDateBtn = document.getElementById('go-to-date-btn');
const overlay = document.getElementById('overlay');

// --- GLOBAL STATE ---
let currentDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// --- FUNCTIONS ---

/**
 * Main function to generate and display the calendar
 */
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    monthYearHeader.textContent = `${monthNames[month]} ${year}`;
    calendarDays.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDayDate = lastDayOfMonth.getDate();

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        calendarDays.appendChild(emptyDiv);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= lastDayDate; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayDiv.classList.add('current-day');
        }
        calendarDays.appendChild(dayDiv);
    }
}

/**
 * Populates the month and year selectors in the popup
 */
function populateSelector() {
    monthSelect.innerHTML = '';
    monthNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
}

/**
 * Shows or hides the date selector popup
 */
function toggleDateSelector(show) {
    if (show) {
        monthSelect.value = currentDate.getMonth();
        yearInput.value = currentDate.getFullYear();
        dateSelector.classList.add('visible');
        overlay.classList.add('visible');
    } else {
        dateSelector.classList.remove('visible');
        overlay.classList.remove('visible');
    }
}

// --- EVENT LISTENERS ---

// Previous month button
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// Next month button
nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Today button - jumps to the current month
todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    renderCalendar();
});

// Open date selector when month/year header is clicked
monthPicker.addEventListener('click', () => {
    toggleDateSelector(true);
});

// Close date selector when overlay is clicked
overlay.addEventListener('click', () => {
    toggleDateSelector(false);
});

// Navigate to selected date from the popup
goToDateBtn.addEventListener('click', () => {
    const newMonth = parseInt(monthSelect.value);
    const newYear = parseInt(yearInput.value);
    
    if (!isNaN(newYear)) {
        currentDate = new Date(newYear, newMonth, 1);
        renderCalendar();
        toggleDateSelector(false);
    }
});

// --- INITIALIZATION ---
populateSelector();
renderCalendar();
