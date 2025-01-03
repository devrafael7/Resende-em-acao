
// Em desenvolvimento - Permanecer comentado para evitar erros no console

//const popUpFazerLogin = document.querySelector('.popUpFazerLogin')
//
//const fecharPopUp = document.querySelector('.fecharPopUp')
//fecharPopUp.addEventListener('click', ()=> {
//    popUpFazerLogin.style.display = "none"
//})


// Capturando informações de login Google e Facebook do Usuário após ter feito login e enviando ao console do index.html
const params = new URLSearchParams(window.location.search);

const user = params.get('user');
if (user) {
    const userInfo = JSON.parse(decodeURIComponent(user));
    console.log('User Info:', userInfo);
}

// let count = 1;
//document.getElementById("radio1").checked = true;

// function nextImage(){
//    count++;
//    if( count>5){
//        count = 1;
//    }

//    document.getElementById("radio"+count).checked = true;
// }

const slides = document.querySelectorAll('.slide');

let currentSlide = 0;

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function updateSlide() {
    // Esconde todos os slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });

    
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;
}


prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
});


nextButton.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlide();
    }
});


updateSlide();