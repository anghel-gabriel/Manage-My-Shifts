import { getLocalStorageItem } from './helpers/get-local-storage.js';
import { setLocalStorageItem } from './helpers/set-local-storage.js';
import { checkLoggedUser } from './helpers/check-logged-user.js';
import { Shift } from './helpers/shift.js';

checkLoggedUser();

document.addEventListener('DOMContentLoaded', () => {
	const shiftForm = document.querySelector('.shift');
	const shiftStart = document.querySelector('.shift__start-time');
	const shiftEnd = document.querySelector('.shift__end-time');
	const shiftHourlyWage = document.querySelector('.shift__hourly-wage');
	const shiftWorkplace = document.querySelector('.shift__workplace');
	const shiftComments = document.querySelector('.shift__comments');
	const loaderWindow = document.querySelector('.loader-window');

	shiftForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// check if start time < end time
		if (new Date(shiftStart.value) < new Date(shiftEnd.value) && shiftHourlyWage.value >= 0) {
			const shifts = getLocalStorageItem('shifts');
			const newShift = new Shift(Date.now(), shiftStart.value, shiftEnd.value, shiftHourlyWage.value, shiftWorkplace.value, shiftComments.value);
			shifts.push(newShift);
			setLocalStorageItem('shifts', shifts);
			loaderWindow.classList.add('modal');

			setTimeout(() => {
				loaderWindow.classList.remove('modal');
				if (window.confirm('Your shift has been added. Do you want to be redirected to the homepage?')) {
					window.location.href = './index.html';
				} else {
					shiftForm.reset();
				}
			}, 2500);
		} else {
			alert('The end time of the shift must be after the start time and the hourly wage should be at least 0!');
		}
	});
});
