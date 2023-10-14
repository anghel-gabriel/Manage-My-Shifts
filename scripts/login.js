import { getLocalStorageItem } from './helpers/get-local-storage.js';
import { setLocalStorageItem } from './helpers/set-local-storage.js';
import { checkLoggedOutUser } from './helpers/check-loggedout-user.js';

checkLoggedOutUser('Please sign out of your current account before logging in with a different one!');

const loginForm = document.querySelector('.login');
const loginUsername = document.querySelector('.login__username');
const loginPassword = document.querySelector('.login__password');
const users = getLocalStorageItem('users');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// check correct credentials
	if (users.some((user) => user.username === loginUsername.value && user.password === loginPassword.value)) {
		// track logged user and login time
		setLocalStorageItem('loggedUser', { username: loginUsername.value, date: new Date().toLocaleString() });
		window.location.href = './index.html';
	} else {
		alert('Incorrect username or password!');
	}
});
