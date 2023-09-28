const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const lnameE1 = document.querySelector("#lname");
const ageE1=document.querySelector("#age");
const pnoE1=document.querySelector("#pno");

const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'POOR');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `POOR`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkPno = () => {

    let valid = false;

    const min = 10,
        max = 10;

    const pno = pnoE1.value();

    if (!isRequired(pno)) {
        showError(pnoE1, 'POOR');
    } else if (pno.length != max) {
        showError(usernameEl, `POOR`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};



const checkAge = () => {

    let valid = false;
    const age = ageE1.value();

    if (!isRequired(age)) {
        showError(ageE1, 'POOR');
    } 
    else {
        showSuccess(ageE1);
        valid = true;
    }
    return valid;
};



const checklname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const lname = lnameE1.value.trim();

    if (!isRequired(lname)) {
        showError(lnameE1, 'POOR');
    } else if (!isBetween(lname.length, min, max)) {
        showError(lnameE1, `POOR`)
    } else {
        showSuccess(lnameE1);
        valid = true;
    }
    return valid;
};



const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'POOR');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'POOR')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'POOR');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'POOR');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'POOR');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'POOR or MISMATCH');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};





const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        islnamevalid=checklname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();
        isAgeValid = checkAge();
        isPnoValid = checkPno();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        islnamevalid &&
        isPnoValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'lname':
            checklname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'age':
            checkAge();
            break;
        case 'pno':
            checkPno();
            break;
    }
}));