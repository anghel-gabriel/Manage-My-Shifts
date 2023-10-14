import { getLocalStorageItem } from './get-local-storage.js';

export const checkLoggedOutUser = (message) => {
	if (getLocalStorageItem('loggedUser')) {
		alert(message);
		window.location.href = './index.html';
	}
};
