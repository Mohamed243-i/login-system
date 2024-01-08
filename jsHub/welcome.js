// desplaying welcome message

(function say_welcome() {
   
    let welcomeMsg = document.getElementById('welcome-msg');
   
    let user = JSON.parse(window.sessionStorage.getItem("current-user"));
    welcomeMsg.innerText += ' ' + user.name+' !';
})();


// handling logout

let logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', function () {
    window.sessionStorage.removeItem("current-user");
    window.history.length = 0;
    window.location.href = '/'; 
});