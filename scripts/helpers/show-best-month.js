import { getLocalStorageItem } from './get-local-storage.js';

export const showBestMonth = () => {
	const monthlyIncome = {};
	const shifts = getLocalStorageItem('shifts').filter((shift) => shift.worker === getLocalStorageItem('loggedUser').username);

	function formatMonthYear(date) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${month} ${year}`;
	}

	shifts.forEach((shift) => {
		const startTime = new Date(shift.startTime);
		const endTime = new Date(shift.endTime);
		const income = ((endTime - startTime) / (1000 * 60 * 60)) * parseFloat(shift.hourlyWage);
		const monthYear = formatMonthYear(startTime);
		monthlyIncome[monthYear] = (monthlyIncome[monthYear] || 0) + income;
	});

	const [bestMonth, highestIncome] = Object.entries(monthlyIncome).reduce((acc, [monthYear, income]) => (income > acc[1] ? [monthYear, income] : acc), ['', 0]);

	if (highestIncome > 0) {
		return `You earned the most money in ${bestMonth}. More exactly, you earned $${highestIncome.toFixed(2)}.`;
	} else {
		return 'You have no shifts added.';
	}
};
