const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

const openNavMenu = () => {
	hamburger.classList.toggle('active');
	navMenu.classList.toggle('active');
};

hamburger.addEventListener('click', openNavMenu);


