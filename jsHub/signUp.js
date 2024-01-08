//inputs
let nameInput = document.getElementById('user-name'),
    emailSignUpInput = document.getElementById('signUp-email'),
    passWordSignUpInput = document.getElementById('signUp-password');

let sginUpBtn = document.getElementById('signUp-btn');

let nameRegEx = /^\w{3,}$/,
    emailRegEx = /^[a-zA-Z]+([\.\-]?\w+)*@([\.\-]?\w+)*(\.\w{2,3})$/,
    passwordRegEx = /^[\w\.\D\-]{6,16}$/;

let validName = false,
    validEmail = false,
    validPwd = false,
    duplicatedEmail = false;

let message = document.querySelector('#msg .text'),
    progressBar = document.getElementById('progress-bar'),
    popUp = document.getElementById('popUp');

let users = [];

// retrieving data from local storage
function initialize() {
    if (!window.localStorage.getItem("users")) return;

    users = JSON.parse(window.localStorage.getItem("users"));
}

initialize();

// validating the inpputs
function validate_input(input, regEx) {
    if (regEx.test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }
    else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

function is_exist(email) {
    let sz = users.length;

    for (let indx = 0; indx < sz; indx++){
        if (users[indx].email == email) return true;
    }

    return false;
}

function clear_inputs() {
    nameInput.value = emailSignUpInput.value = passWordSignUpInput.value = "";
    validName = validEmail = validPwd = duplicatedEmail = false;
    
    nameInput.classList.remove('is-valid');
    nameInput.classList.remove('is-invalid');

    emailSignUpInput.classList.remove('is-valid');
    emailSignUpInput.classList.remove('is-invalid');

    passWordSignUpInput.classList.remove('is-valid');
    passWordSignUpInput.classList.remove('is-invalid');
}

nameInput.addEventListener('input', function () {
    nameInput.classList.remove('is-valid');
    nameInput.classList.remove('is-invalid');

    validName =  validate_input(nameInput, nameRegEx);
});

emailSignUpInput.addEventListener('input', function () {
    emailSignUpInput.classList.remove('is-valid');
    emailSignUpInput.classList.remove('is-invalid');

    validEmail = validate_input(emailSignUpInput, emailRegEx);
    duplicatedEmail = is_exist(emailSignUpInput.value);
});

passWordSignUpInput.addEventListener('input', function () {
    passWordSignUpInput.classList.remove('is-valid');
    passWordSignUpInput.classList.remove('is-invalid');

    validPwd = validate_input(passWordSignUpInput, passwordRegEx);
});

// handling signing up

function SignUp() {
    if (!duplicatedEmail) {   
        let user = {
            name: nameInput.value,
            email: emailSignUpInput.value,
            password: passWordSignUpInput.value
        }

        users.push(user);
        window.localStorage.setItem("users", JSON.stringify(users));

        clear_inputs();

        window.location.href = '/';
    }
    else {
        show_popUp("This Email Is Already Used, Try another one"); 
    }
}

sginUpBtn.addEventListener('click', function () {
    if (!validName || !validEmail || !validPwd) return;
    
    SignUp();
  
});

// popUp
function show_popUp(msg) {
    popUp.classList.replace('hide-popUp', 'show-popUp');
    message.innerHTML = msg;
    let count = 5;
    let id = setInterval(function () {
        count--;
        if (count < 0) {
            popUp.classList.replace('show-popUp', 'hide-popUp');
            clearInterval(id);
        }
         
        
        progressBar.style.cssText = `width: ${(count / 5) * 100}% !important`;

        
    },1000)
}