const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateInputs()) {
        alert('Form submitted successfully!');
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const numberValue = number.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let isValid = true;

    if (nameValue === '') {
        setError(name, 'Full Name is required');
        isValid = false;
    } else if (nameValue.length < 5) {
        setError(name, 'Name must be at least 5 characters.');
        isValid = false;
    } else {
        setSuccess(name);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (numberValue === '') {
        setError(number, 'Phone Number is required');
        isValid = false;
    } else if (numberValue === '123456789') {
        setError(number, 'Phone Number cannot be 123456789');
        isValid = false;
    } else if (numberValue.length !== 10 || isNaN(numberValue)) {
        setError(number, 'Phone Number must be a 10-digit number');
        isValid = false;
    } else {
        setSuccess(number);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else if (passwordValue.toLowerCase() === 'password' || passwordValue.toLowerCase() === nameValue.toLowerCase()) {
        setError(password, 'Password cannot be "password" or your name');
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        setError(password, 'Password must contain at least one uppercase letter.');
        isValid = false;
    } else if (!/[a-z]/.test(passwordValue)) {
        setError(password, 'Password must contain at least one lowercase letter.');
        isValid = false;
    } else if (!/[0-9]/.test(passwordValue)) {
        setError(password, 'Password must contain at least one number.');
        isValid = false;
    } else if (!/[^A-Za-z0-9]/.test(passwordValue)) {
        setError(password, 'Password must contain at least one special character.');
        isValid = false;
    } else {
        setSuccess(password);
    }
    

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        isValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        isValid = false;
    } else {
        setSuccess(password2);
    }

    return isValid;
};
