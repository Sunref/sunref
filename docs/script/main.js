// ===== AUTH CHECK =====
(function() {
  if (!sessionStorage.getItem('authenticated')) {
    window.location.replace('login.html');
  }
})();

// ===== ELEMENTOS =====
var windowWrapper = document.querySelector(".window-wrapper");
var desktopIcon = document.getElementById("desktop-icon");
var taskbarPortfolio = document.getElementById("taskbar-portfolio");
var startMenuEl = document.getElementById("start-menu");
var windowState = 'normal'; // 'normal', 'minimized', 'closed'

// ===== BOTÕES DA JANELA =====
document.getElementById("btn-close").addEventListener("click", function () {
  closeWindow();
});

document.getElementById("btn-minimize").addEventListener("click", function () {
  if (windowState === 'normal') {
    minimizeWindow();
  } else if (windowState === 'minimized') {
    restoreWindow();
  }
});

document.getElementById("btn-maximize").addEventListener("click", function () {
  this.style.transform = "scale(0.95)";
  var self = this;
  setTimeout(function() { self.style.transform = "scale(1)"; }, 100);
});

// ===== FUNÇÕES DE JANELA =====
function closeWindow() {
  windowWrapper.classList.add("hidden");
  desktopIcon.classList.remove("hidden");
  taskbarPortfolio.classList.add("hidden");
  windowState = 'closed';
  closeStartMenu();
}

function minimizeWindow() {
  windowWrapper.classList.add("hidden");
  taskbarPortfolio.classList.add("active");
  windowState = 'minimized';
  closeStartMenu();
}

function restoreWindow() {
  windowWrapper.classList.remove("hidden");
  taskbarPortfolio.classList.remove("active");
  windowState = 'normal';
}

function openWindow() {
  windowWrapper.classList.remove("hidden");
  desktopIcon.classList.add("hidden");
  taskbarPortfolio.classList.remove("hidden");
  taskbarPortfolio.classList.remove("active");
  windowState = 'normal';
}

function taskbarClick() {
  if (windowState === 'minimized') {
    restoreWindow();
  } else if (windowState === 'normal') {
    minimizeWindow();
  }
}

// ===== MENU INICIAR =====
function toggleStartMenu() {
  startMenuEl.classList.toggle("hidden");
}

function closeStartMenu() {
  startMenuEl.classList.add("hidden");
}

document.querySelector(".start-button").addEventListener("click", function (e) {
  e.stopPropagation();
  toggleStartMenu();
});

document.addEventListener("click", function (e) {
  if (
    !startMenuEl.contains(e.target) &&
    !document.querySelector(".start-button").contains(e.target)
  ) {
    closeStartMenu();
  }
});

// ===== DESLIGAR =====
function shutdownPC() {
  window.location.href = 'shutdown.html';
}

// ===== TROCA DE IDIOMA =====
document.querySelector(".button")?.addEventListener("click", toggleLang);

function toggleLang() {
  var currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "indexEN.html") {
    window.location.href = "index.html";
  } else {
    window.location.href = "indexEN.html";
  }
}

// ===== DRAG (apenas desktop) =====
var isMobile = function() { return window.innerWidth <= 600; };

var titleBar = document.querySelector(".title-bar");

var isDragging = false;
var currentX = 0;
var currentY = 0;
var initialX = 0;
var initialY = 0;
var xOffset = 0;
var yOffset = 0;

titleBar.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

titleBar.addEventListener("touchstart", function(e) {
  if (!isMobile()) dragStart(e);
}, { passive: false });

document.addEventListener("touchmove", function(e) {
  if (!isMobile()) drag(e);
}, { passive: false });

document.addEventListener("touchend", function() {
  if (!isMobile()) dragEnd();
});

function dragStart(e) {
  if (e.target.classList.contains("window-btn")) return;
  if (isMobile()) return;

  var clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  var clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

  initialX = clientX - xOffset;
  initialY = clientY - yOffset;
  isDragging = true;
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();

  var clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  var clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

  currentX = clientX - initialX;
  currentY = clientY - initialY;
  xOffset = currentX;
  yOffset = currentY;

  windowWrapper.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
  windowWrapper.style.position = "relative";
}

function dragEnd() {
  if (!isDragging) return;
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
}

// ===== RELÓGIO =====
function updateClock() {
  var now = new Date();
  var hours = String(now.getHours()).padStart(2, "0");
  var minutes = String(now.getMinutes()).padStart(2, "0");
  var clockEl = document.getElementById("clock");
  if (clockEl) clockEl.textContent = hours + ":" + minutes;
}
updateClock();
setInterval(updateClock, 1000);