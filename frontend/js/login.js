const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')

const dontHaveAccountDiv = document.querySelector('.dontHaveAccountDiv')
const alreadyHaveAccountDiv = document.querySelector('.alreadyHaveAccountDiv')

dontHaveAccountDiv.addEventListener('click', ()=> {
    container.classList.add('active')
})

alreadyHaveAccountDiv.addEventListener('click', ()=> {
    container.classList.remove('active')
    signUp.classList.add('hiddenItem')
})

