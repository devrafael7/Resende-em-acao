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

const signUpForm = document.querySelector('.signUpForm')
const signInForm = document.querySelector('.signInForm')

const loginForm = document.querySelectorAll('.loginForm')

const wholeLoadingDiv = document.querySelector('.wholeLoadingDiv')

loginForm.forEach( loginForms => {
    loginForms.addEventListener('submit', (event)=> {
        event.preventDefault()

        wholeLoadingDiv.style.display = "flex"

        setTimeout( ()=> {
            wholeLoadingDiv.style.display = "none"
            signInForm.submit()
        },1700)
    })
})

document.querySelectorAll('form').forEach(form => {
    form.action = "https://devrafael7.github.io/Resende-em-acao/";
  });
  

