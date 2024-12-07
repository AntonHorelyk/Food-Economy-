const mail = document.getElementById('mail');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.querySelector('.errorMessage');

const userMail = localStorage.getItem('userMail');
const userPassword = localStorage.getItem('password');

loginBtn.addEventListener('click', function(){
    if(mail.value !== userMail){
        errorMessage.textContent = 'מייל או סיסמא שגויים נסה שנית';
        return;
    }

    if(password.value !== userPassword){
        errorMessage.textContent = 'מייל או סיסמא שגויים נסה שנית';    
        return;
    }

    localStorage.setItem('logged', true);
    window.location.href = "../index.html";
});