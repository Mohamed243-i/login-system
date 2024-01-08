
// inputs 
let emailLoginInput = document.getElementById('login-email'),
passwordLoginInput = document.getElementById('login-password');


let loginBtn = document.getElementById('login-btn');

let emailRegEx = /^[a-zA-Z]+([\.\-]?\w+)*@([\.\-]?\w+)*(\.\w{2,3})$/,
    passwordRegEx = /^[\w\.\D\-]{6,16}$/;

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

let validEmail = false,
    validPwd = false;

// validating the inputs
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

function clear_inputs() {
    emailLoginInput.value = passwordLoginInput.value = "";
    validEmail = validPwd = false;
    
    emailLoginInput.classList.remove('is-valid');
    emailLoginInput.classList.remove('is-invalid');

    passwordLoginInput.classList.remove('is-valid');
    passwordLoginInput.classList.remove('is-invalid');
}

emailLoginInput.addEventListener('input', function () {
    emailLoginInput.classList.remove('is-valid');
    emailLoginInput.classList.remove('is-invalid');

    validEmail = validate_input(emailLoginInput, emailRegEx);
});

passwordLoginInput.addEventListener('input', function () {
    passwordLoginInput.classList.remove('is-valid');
    passwordLoginInput.classList.remove('is-invalid');

    validPwd = validate_input(passwordLoginInput, passwordRegEx);
});

// handling loging in
function signIn(email, password) {
    
    let sz = users.length;
    let currentUser ;

    for (let indx = 0; indx < sz; indx++){
        if (users[indx].email == email && users[indx].password == password) {
            currentUser = {
                name: users[indx].name,
                email: users[indx].email,
                password: users[indx].password
            }
            
            window.sessionStorage.setItem("current-user", JSON.stringify(currentUser));
            break;
        }
    }


    if (currentUser) {
        clear_inputs();
        window.location.href = '../htmlHub/welcome.html';
    }
    else {
        show_popUp("Login Failed. Email or Password is incorrect, Try Again");
    }
}

loginBtn.addEventListener('click', function () {
    if (!validEmail || !validPwd) return;

    signIn(emailLoginInput.value, passwordLoginInput.value);
    clear_inputs();
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
