// Get references to the HTML elements we need to interact with
const monthYearHeader = document.getElementById('month-year-header');
const prevMonthBtn = document.getElementById('prev-month-btn');
const nextMonthBtn = document.getElementById('next-month-btn');
const calendarDays = document.getElementById('calendar-days');

// Use the current date as the starting point
let currentDate = new Date();

// This is the main function that builds and displays the calendar
function renderCalendar() {
    // Set the year and month from our currentDate object
        const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

                // Update the header to show the current month and year
                    monthYearHeader.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
                        
                            // Clear out any old day cells from the grid
                                calendarDays.innerHTML = '';

                                    // Calculate key dates for the current month
                                        const firstDayOfMonth = new Date(year, month, 1);
                                            const lastDayOfMonth = new Date(year, month + 1, 0);
                                                const lastDayOfPrevMonth = new Date(year, month, 0);

                                                    const firstDayIndex = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
                                                        const lastDayDate = lastDayOfMonth.getDate();
                                                            
                                                                // 1. Add empty placeholders for days before the 1st of the month
                                                                    for (let i = 0; i < firstDayIndex; i++) {
                                                                            const emptyDiv = document.createElement('div');
                                                                                    emptyDiv.classList.add('empty');
                                                                                            calendarDays.appendChild(emptyDiv);
                                                                                                }

                                                                                                    // 2. Add the actual days of the current month
                                                                                                        for (let day = 1; day <= lastDayDate; day++) {
                                                                                                                const dayDiv = document.createElement('div');
                                                                                                                        dayDiv.textContent = day;

                                                                                                                                // Highlight today's date
                                                                                                                                        const today = new Date();
                                                                                                                                                if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                                                                                                                                                            dayDiv.classList.add('current-day');
                                                                                                                                                                    }
                                                                                                                                                                            
                                                                                                                                                                                    calendarDays.appendChild(dayDiv);
                                                                                                                                                                                        }
                                                                                                                                                                                        }

                                                                                                                                                                                        // Event listener for the "previous month" button
                                                                                                                                                                                        prevMonthBtn.addEventListener('click', () => {
                                                                                                                                                                                            currentDate.setMonth(currentDate.getMonth() - 1);
                                                                                                                                                                                                renderCalendar(); // Re-render the calendar for the new month
                                                                                                                                                                                                });

                                                                                                                                                                                                // Event listener for the "next month" button
                                                                                                                                                                                                nextMonthBtn.addEventListener('click', () => {
                                                                                                                                                                                                    currentDate.setMonth(currentDate.getMonth() + 1);
                                                                                                                                                                                                        renderCalendar(); // Re-render the calendar for the new month
                                                                                                                                                                                                        });

                                                                                                                                                                                                        // Initial call to display the calendar when the page first loads
                                                                                                                                                                                                        renderCalendar();
                                                                                                                                                                                                        