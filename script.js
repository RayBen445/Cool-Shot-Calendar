// --- DOM ELEMENT REFERENCES ---
const monthYearHeader = document.getElementById('month-year-header');
const monthPicker = document.getElementById('month-picker');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const todayBtn = document.getElementById('today-btn');
const calendarDays = document.getElementById('calendar-days');
const overlay = document.getElementById('overlay');

// --- DATE SELECTOR POPUP ELEMENTS ---
const dateSelector = document.getElementById('date-selector');
const monthSelect = document.getElementById('month-select');
const yearInput = document.getElementById('year-input');
const goToDateBtn = document.getElementById('go-to-date-btn');

// --- ADD ENTRY MODAL ELEMENTS ---
const addEntryModal = document.getElementById('add-entry-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const entryDateDisplay = document.getElementById('entry-date-display');
const entryTitleInput = document.getElementById('entry-title-input');
const saveEntryBtn = document.getElementById('save-entry-btn');

// --- DYNAMIC DATE ELEMENTS ---
const pageTitle = document.getElementById('page-title');
const footerYear = document.getElementById('footer-year');

// --- GLOBAL STATE ---
let currentDate = new Date();
let selectedDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let entries = []; // Array to store all our entries

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

    for (let i = 0; i < firstDayIndex; i++) {
        calendarDays.insertAdjacentHTML('beforeend', '<div class="day empty"></div>');
    }

    for (let day = 1; day <= lastDayDate; day++) {
        const dayDate = new Date(year, month, day);
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const dayNumber = document.createElement('span');
        dayNumber.textContent = day;
        dayDiv.appendChild(dayNumber);

        if (dayDate.toDateString() === new Date().toDateString()) {
            dayNumber.classList.add('current-day');
        }
        if (dayDate.toDateString() === selectedDate.toDateString()) {
            dayDiv.classList.add('selected-day');
        }

        const dayEntries = entries.filter(e => new Date(e.date).toDateString() === dayDate.toDateString());
        if (dayEntries.length > 0) {
            const entriesContainer = document.createElement('div');
            entriesContainer.classList.add('entries-container');
            dayEntries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry', `entry-${entry.type}`);
                entryDiv.textContent = entry.title;
                entriesContainer.appendChild(entryDiv);
            });
            dayDiv.appendChild(entriesContainer);
        }

        dayDiv.addEventListener('click', () => {
            if (dayDiv.classList.contains('empty')) return;
            selectedDate = dayDate;
            openAddEntryModal(dayDate);
        });
        
        calendarDays.appendChild(dayDiv);
    }
}

/**
 * Opens the "Add Entry" modal for a specific date
 */
function openAddEntryModal(date) {
    entryDateDisplay.textContent = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    overlay.classList.add('visible');
    addEntryModal.classList.add('visible');
}

/**
 * Closes any active modal
 */
function closeModal() {
    overlay.classList.remove('visible');
    addEntryModal.classList.remove('visible');
    dateSelector.classList.remove('visible');
    entryTitleInput.value = '';
}

/**
 * Saves a new entry
 */
function saveEntry() {
    const title = entryTitleInput.value.trim();
    if (title) {
        const type = document.querySelector('input[name="entry-type"]:checked').value;
        entries.push({
            date: selectedDate.toISOString(),
            title: title,
            type: type
        });
        closeModal();
        renderCalendar();
    }
}

// --- EVENT LISTENERS ---
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    selectedDate = new Date();
    renderCalendar();
});

monthPicker.addEventListener('click', () => {
    dateSelector.classList.add('visible');
    overlay.classList.add('visible');
});

goToDateBtn.addEventListener('click', () => {
    const newYear = parseInt(yearInput.value);
    const newMonth = parseInt(monthSelect.value);
    if (!isNaN(newYear)) {
        currentDate = new Date(newYear, newMonth, 1);
        selectedDate = new Date(currentDate);
        renderCalendar();
    }
    closeModal();
});

// Modal-related listeners
saveEntryBtn.addEventListener('click', saveEntry);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// --- INITIALIZATION ---
function initializeApp() {
    const year = new Date().getFullYear();
    pageTitle.textContent = `Cool Shot Calendar - ${year}`;
    footerYear.textContent = year;

    monthNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    renderCalendar();
}

initializeApp();
