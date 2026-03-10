const hamburgerIcon = document.querySelector('.hamburger-icon');
const sideNav = document.querySelector('.nav-links');
const navClose = document.querySelector('.close-icon');


hamburgerIcon.addEventListener('click', () => {
    sideNav.style.display = 'flex';
    navClose.style.display = 'inline-block'
})


navClose.addEventListener('click', ()=>{
    sideNav.style.display = 'none';
    navClose.style.display = 'none';
})

