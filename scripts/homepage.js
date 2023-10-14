import { getLocalStorageItem } from './helpers/get-local-storage.js';
import { setLocalStorageItem } from './helpers/set-local-storage.js';
import { checkLoggedUser } from './helpers/check-logged-user.js';
import { showBestMonth } from './helpers/show-best-month.js';

checkLoggedUser();

// check for 'shifts' item in local storage; if not, set it as empty array
if (getLocalStorageItem('shifts') === null) {
	setLocalStorageItem('shifts', []);
}

window.addEventListener('DOMContentLoaded', () => {
	const bestMonthText = document.querySelector('.best-month');

	const renderBestMonth = () => {
		bestMonthText.textContent = showBestMonth();
	};
	renderBestMonth();

	const addShiftBtn = document.querySelector('.add-shift');
	addShiftBtn.addEventListener('click', () => {
		window.location.href = './add-shift.html';
	});

	// find current user shifts
	const loggedUser = getLocalStorageItem('loggedUser');
	const allShifts = getLocalStorageItem('shifts');
	const loggedUserShifts = allShifts.filter((shift) => shift.worker === loggedUser.username);

	//transform "2023-09-11T18:28" into 09/11/2023, 18:28 PM
	function getDateDisplay(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return month + '/' + day + '/' + year + ', ' + hours + ':' + minutes;
	}

	function getProfit(t1, t2, hourlyWage) {
		const startTime = new Date(t1);
		const endTime = new Date(t2);
		const timeDifference = endTime - startTime;
		const hoursDifference = timeDifference / (1000 * 60 * 60);
		return hourlyWage * hoursDifference;
	}

	function renderShifts(shiftsArr) {
		tableBody.innerHTML = '';
		shiftsArr.forEach((shift) => {
			const tableRow = document.createElement('tr');
			tableRow.innerHTML = `
                <td data-label="Shift ID">${shift.id}</td>
                <td data-label="Start Time">FROM ${getDateDisplay(shift.startTime)} </br> TO ${getDateDisplay(shift.endTime)}</td>
                <td data-label="Workplace">${shift.workplace}</td>
                <td data-label="Hourly Wage">${shift.hourlyWage}$ / hour</td>
                <td data-label="Total Profit">${getProfit(shift.startTime, shift.endTime, shift.hourlyWage).toFixed(2)}$</td>
                <td data-label="Comments">${shift.comments}</td>
                <td data-label="Actions">
                    <button class="edit-shift">Modify</button>
                    <button class="delete-shift">Delete</button>
                </td>`;
			tableBody.appendChild(tableRow);
		});
	}

	const tableBody = document.querySelector('tbody');
	// render only if logged user has any shift
	if (loggedUserShifts.length) {
		renderShifts(loggedUserShifts);
	}

	function handleDelete(e) {
		// find the targeted shift
		const targetShiftBtn = e.target;
		const targetRow = targetShiftBtn.closest('tr');
		const targetShiftId = targetRow.querySelector('td[data-label="Shift ID"]').textContent;
		const shifts = getLocalStorageItem('shifts');
		const indexToDelete = shifts.findIndex((shift) => shift.id.toString() === targetShiftId);
		shifts.splice(indexToDelete, 1);
		setLocalStorageItem('shifts', shifts);
		targetRow.remove();
		renderBestMonth();
	}

	function handleEdit(e) {
		// find the targeted shift
		const targetShiftBtn = e.target;
		const targetRow = targetShiftBtn.closest('tr');
		const targetShiftId = targetRow.querySelector('td[data-label="Shift ID"]').textContent;
		// will use this item later to know which shift to edit
		setLocalStorageItem('shiftToEdit', targetShiftId);
		window.location.href = './modify-shift.html';
	}

	const deleteButtons = document.querySelectorAll('.delete-shift');
	deleteButtons.forEach((button) => {
		button.addEventListener('click', handleDelete);
	});

	const editButtons = document.querySelectorAll('.edit-shift');
	editButtons.forEach((button) => {
		button.addEventListener('click', handleEdit);
	});

	const filterWorkplace = document.querySelector('.filter__workplace');
	const filterStartDate = document.querySelector('.filter__start');
	const filterEndDate = document.querySelector('.filter__end');

	// Function to filter and render shifts
	function filterAndRenderShifts() {
		const currentUserShifts = loggedUserShifts.filter((shift) => {
			const startDateTime = new Date(shift.startTime);
			const endDateTime = new Date(shift.endTime);

			// Adjust the time component of startDateTime and endDateTime to match the filter date's time component
			const filterStartDateValue = new Date(filterStartDate.value);
			const filterEndDateValue = new Date(filterEndDate.value);

			filterStartDateValue.setHours(0, 0, 0, 0);
			filterEndDateValue.setHours(23, 59, 59, 999);
			const meetsWorkplaceCriteria = !filterWorkplace.value || shift.workplace === filterWorkplace.value;
			const meetsStartDateCriteria = !filterStartDate.value || startDateTime >= filterStartDateValue;
			const meetsEndDateCriteria = !filterEndDate.value || endDateTime <= filterEndDateValue;
			return meetsWorkplaceCriteria && meetsStartDateCriteria && meetsEndDateCriteria;
		});

		renderShifts(currentUserShifts);
	}

	filterWorkplace.addEventListener('change', filterAndRenderShifts);
	filterStartDate.addEventListener('input', filterAndRenderShifts);
	filterEndDate.addEventListener('input', filterAndRenderShifts);

	const resetFiltersBtn = document.querySelector('.reset-filters');
	resetFiltersBtn.addEventListener('click', () => {
		filterWorkplace.value = '';
		filterStartDate.value = '';
		filterStartDate.type = 'text';
		filterEndDate.value = '';
		filterStartDate.type = 'text';
		filterAndRenderShifts();
	});
});
