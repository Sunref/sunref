function doLogin() {
  var passEl = document.getElementById('password-input');
  var errorEl = document.getElementById('login-error');
  var pass = passEl.value;

  if (pass === 'sunref') {
    sessionStorage.setItem('authenticated', 'true');
    document.body.classList.add('fade-out');
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 550);
  } else {
    errorEl.textContent = 'Senha incorreta. Tente novamente.';
    passEl.value = '';
    passEl.classList.remove('shake');
    void passEl.offsetWidth;
    passEl.classList.add('shake');
    setTimeout(function() { passEl.classList.remove('shake'); }, 500);
  }
}

function tryClose() {
  window.location.href = 'shutdown.html';
}