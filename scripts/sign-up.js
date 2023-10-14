import {getLocalStorageItem} from './helpers/get-local-storage.js';
import {setLocalStorageItem} from './helpers/set-local-storage.js';
import {checkLoggedOutUser} from './helpers/check-loggedout-user.js';
import {User} from './helpers/user.js';

checkLoggedOutUser("Please sign out of your current account before creating a new one!");

const registerForm = document.querySelector('.register');
const registerEmail = document.querySelector('.register__email');
const registerUsername = document.querySelector('.register__username');
const registerPassword = document.querySelector('.register__password');
const registerFirstName = document.querySelector('.register__first-name');
const registerLastName = document.querySelector('.register__last-name');
const registerAge = document.querySelector('.register__age');

// check if 'users' item exists in local storage; otherwise, create it as empty array
if (getLocalStorageItem('users') === null) setLocalStorageItem('users', []);

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentUsers = getLocalStorageItem('users');

    // check user already existing
    if (currentUsers.some((user) => user.username === registerUsername.value)) {
        alert('User already existing. Choose another username!');
    } else {
        // adding user to users
        const newUser = new User(Date.now(), registerEmail.value, registerUsername.value, registerPassword.value, registerFirstName.value, registerLastName.value, registerAge.value);
        currentUsers.push(newUser);
        setLocalStorageItem('users', currentUsers);
        console.log(getLocalStorageItem('users'));
        window.location.href = './login.html';
    }
});
