import { getLocalStorageItem } from './helpers/get-local-storage.js';
import { setLocalStorageItem } from './helpers/set-local-storage.js';
import { checkLoggedUser } from './helpers/check-logged-user.js';
import { User } from './helpers/user.js';

checkLoggedUser();

const editForm = document.querySelector('.edit');
const editEmail = document.querySelector('.edit__email');
const editUsername = document.querySelector('.edit__username');
const editPassword = document.querySelector('.edit__password');
const editFirstName = document.querySelector('.edit__first-name');
const editLastName = document.querySelector('.edit__last-name');
const editAge = document.querySelector('.edit__age');

const loggedUser = getLocalStorageItem('loggedUser');
const users = getLocalStorageItem('users');

// get logged user credentials
const loggedUserObj = users.find((user) => user.username === loggedUser.username);

// fill input fields with current logged user credentials
editEmail.value = loggedUserObj.email;
editUsername.value = loggedUserObj.username;
editPassword.value = loggedUserObj.password;
editFirstName.value = loggedUserObj.firstName;
editLastName.value = loggedUserObj.lastName;
editAge.value = loggedUserObj.age;

const indexOfLoggedUser = users.findIndex((user) => user.username === loggedUser.username);

editForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// update users and loggedUser
	if (users.some((user) => user.username === editUsername.value) && editUsername.value !== loggedUser.username) {
		alert('Username already existing. Choose another username!');
	} else {
		const newUserCredentials = new User(loggedUserObj.id, editEmail.value, editUsername.value, editPassword.value, editFirstName.value, editLastName.value, editAge.value);
		users[indexOfLoggedUser] = newUserCredentials;
		setLocalStorageItem('users', users);
		setLocalStorageItem('loggedUser', { username: newUserCredentials.username, date: loggedUser.date });

		// update username in shifts
		const shifts = getLocalStorageItem('shifts');
		shifts.forEach((shift) => {
			if (shift.worker === loggedUser.username) {
				shift.worker = newUserCredentials.username;
			}
		});
		setLocalStorageItem('shifts', shifts);
		window.location.href = './index.html';
	}
});
