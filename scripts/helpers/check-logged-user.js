import { getLocalStorageItem } from './get-local-storage.js';

const removeLocalStorageLoggedItems = () => {
	localStorage.removeItem('loggedUser');
	localStorage.removeItem('shiftToEdit');
};

export const checkLoggedUser = () => {
	const loggedUser = getLocalStorageItem('loggedUser');
	const sessionExpiredMessage = 'Your session has expired! Please log in again!';

	// check if any user is logged in
	if (loggedUser === null) {
		alert(sessionExpiredMessage);
		window.location.href = './login.html';
	}

	// log out the user if logged in for more than 60 minutes
	const loggedTime = new Date(loggedUser.date);
	const currentTime = new Date();
	const minutesElapsed = (currentTime - loggedTime) / (1000 * 60);

	if (minutesElapsed >= 60) {
		removeLocalStorageLoggedItems();
		alert(sessionExpiredMessage);
		window.location.href = './login.html';
	}

	document.addEventListener('DOMContentLoaded', function () {
		const logOutBtn = document.querySelector('.log-out');
		const greetingText = document.querySelector('.greeting');
		const loggedUser = getLocalStorageItem('loggedUser');
		greetingText.textContent = `Hello, ${loggedUser.username}!`;
		logOutBtn.addEventListener('click', () => {
			removeLocalStorageLoggedItems();
			window.location.href = './login.html';
		});
	});
};
