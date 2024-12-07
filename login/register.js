const form = document.getElementById('signupForm');
const errorName = document.getElementById('errorMessageName');
const errorLastName = document.getElementById('errorMessageLastname');
const errorBirthday = document.getElementById('errorMessageBirthday');
const errorpassword = document.getElementById('errorMessagePassword');
const errorPasswordValid = document.getElementById('errorMessagePasswordValid');
const errorMail = document.getElementById('errorMessageMail');
const allErrors = document.querySelector('.errorMessage');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);

    allErrors.textContent = '';
    errorName.textContent = '';
    errorLastName.textContent = '';
    errorBirthday.textContent = '';
    errorpassword.textContent = '';
    errorPasswordValid.textContent = '';
    errorMail.textContent = '';

    const isValidName = /^[a-zA-Zא-ת\s]+$/.test(data.name);
    if (!isValidName) {
        errorName.textContent = 'שם אינו יכול להכיל ספרות';
        return;
    }

    console.log(data.lastname)
    const isValidLastName = /^[a-zA-Zא-ת\s]+$/.test(data.lastname);
    if (!isValidLastName) {
        errorLastName.textContent = 'שם משפחה אינו יכול להכיל ספרות';
        return;
    }

    const currentDate = new Date().getTime();
    const birthdayDate = new Date(data.birthday).getTime();
    
    if (!data.birthday || currentDate < birthdayDate) {
        errorBirthday.textContent = 'תאריך הלידה אינו יכול להיות בעתיד';
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(data.mail)) {
        errorMail.textContent = 'הכנס מייל תקין';
        return;
    }

    const passwordRegex = /^(?=(.*[a-zA-Z]){4})(?=(.*\d){3}).+$/.test(data.password);
    if (!passwordRegex) {
        errorpassword.textContent = 'הסיסמא חייבת לכלול לפחות 4 אותיות ו3 ספרות';
        return;
    }

    if (data.password !== data.passwordValid) {
        errorPasswordValid.textContent = 'הסיסמאות אינן זהות';
        return;
    }

    localStorage.setItem('userName', data.name);
    localStorage.setItem('userMail', data.mail);
    localStorage.setItem('password', data.password);
    
    window.location.href = "./login.html";
});
