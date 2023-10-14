import { getLocalStorageItem } from './helpers/get-local-storage.js';
import { setLocalStorageItem } from './helpers/set-local-storage.js';
import { checkLoggedOutUser } from './helpers/check-loggedout-user.js';

checkLoggedOutUser('Please sign out of your current account before logging in with a different one!');

const resetForm = document.querySelector('.reset');
const resetUsername = document.querySelector('.reset__username');
const resetPassword = document.querySelector('.reset__password');
const resetConfirmPassword = document.querySelector('.reset__confirm-password');
const users = getLocalStorageItem('users');

resetForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!users.some((user) => user.username === resetUsername.value)) {
		alert('The username you entered does not exist in our system. Please check the username and try again.');
	} else {
		if (resetPassword.value === resetConfirmPassword.value) {
			const users = getLocalStorageItem('users');
			const indexOfUser = users.findIndex((user) => user.username === resetUsername.value);
			users[indexOfUser].password = resetPassword.value;
			setLocalStorageItem('users', users);
			alert('Your password has been successfully set. You can now log in with your new password.');
			window.location.href = './login.html';
		} else alert('The two passwords entered do not match. Please ensure that both passwords are identical and try again.');
	}
});
