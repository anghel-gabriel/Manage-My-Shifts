import { getLocalStorageItem } from './helpers/get-local-storage.js';
import { setLocalStorageItem } from './helpers/set-local-storage.js';
import { checkLoggedUser } from './helpers/check-logged-user.js';
import { Shift } from './helpers/shift.js';

// user must be logged in to proceed
checkLoggedUser();

document.addEventListener('DOMContentLoaded', () => {
	const editShiftForm = document.querySelector('.modify');
	const editShiftId = document.querySelector('.modify__id');
	const editShiftStart = document.querySelector('.modify__start-time');
	const editShiftEnd = document.querySelector('.modify__end-time');
	const editShiftHourlyWage = document.querySelector('.modify__hourly-wage');
	const editShiftWorkplace = document.querySelector('.modify__workplace');
	const editShiftComments = document.querySelector('.modify__comments');
	const loaderWindow = document.querySelector('.loader-window');

	const shiftId = getLocalStorageItem('shiftToEdit');
	const shifts = getLocalStorageItem('shifts');
	const shiftObj = shifts.find((shift) => shift.id.toString() === shiftId);
	const shiftIndex = shifts.indexOf(shiftObj);

	// add current data in fields
	editShiftId.value = '#' + shiftObj.id;
	editShiftStart.value = shiftObj.startTime;
	editShiftEnd.value = shiftObj.endTime;
	editShiftHourlyWage.value = shiftObj.hourlyWage;
	editShiftWorkplace.value = shiftObj.workplace;
	editShiftComments.value = shiftObj.comments;

	editShiftForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// check end date > start date
		if (new Date(editShiftStart.value) < new Date(editShiftEnd.value)) {
			shifts[shiftIndex] = new Shift(parseInt(shiftId), editShiftStart.value, editShiftEnd.value, editShiftHourlyWage.value, editShiftWorkplace.value, editShiftComments.value);
			setLocalStorageItem('shifts', shifts);
			loaderWindow.classList.add('modal');

			// spinner loader
			setTimeout(() => {
				loaderWindow.classList.remove('modal');
				window.location.href = './index.html';
			}, 2500);
		} else {
			alert('The end time of the shift must be after the start time!');
		}

		setLocalStorageItem('shiftToEdit', null);
	});
});
