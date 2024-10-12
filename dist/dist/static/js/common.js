function ready() {
  if (localStorage['login'] === 'true') {
    window.location.href = 'index.html'
  }
}
document.addEventListener('DOMContentLoaded', ready)

var logIn = document.getElementById('logIn')
var logOut = document.getElementById('logOut')
var personal = document.getElementById('personal')
var quit = document.getElementById('quit')
if (localStorage['login'] === 'true') {
  logOut.style.display = 'none'
  logIn.style.display = 'block'
} else {
  logOut.style.display = 'block'
  logIn.style.display = 'none'
}
quit.onclick = function () {
  localStorage.setItem('login', 'false')
}
