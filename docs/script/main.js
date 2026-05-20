// ===== BOOT SEQUENCE =====
(function () {
	var overlay = document.getElementById("boot-overlay");
	if (!overlay) return;

	var lines = [
		{ text: "BIOS v2.4.1  —  sunref-pc", cls: "boot-dim" },
		{ text: "CPU: Intel Core i5  |  RAM: 8192MB OK", cls: "boot-dim" },
		{ text: "", cls: "" },
		{ text: "Loading kernel...", cls: "boot-info" },
		{ text: "[  OK  ] Started udev Kernel Device Manager", cls: "boot-ok" },
		{
			text: "[  OK  ] Reached target System Initialization",
			cls: "boot-ok",
		},
		{ text: "[  OK  ] Started Network Manager", cls: "boot-ok" },
		{
			text: "[ WARN ] portfolio.service: Loaded with warnings",
			cls: "boot-warn",
		},
		{ text: "[  OK  ] Started portfolio.service", cls: "boot-ok" },
		{ text: "", cls: "" },
		{
			text: "Welcome to sunref-pc  //  fernanda@portfolio",
			cls: "boot-info",
		},
	];

	var container = overlay.querySelector(".boot-lines");
	var delay = 0;

	lines.forEach(function (l) {
		var el = document.createElement("div");
		el.className = "boot-line" + (l.cls ? " " + l.cls : "");
		el.textContent = l.text || " ";
		container.appendChild(el);

		setTimeout(function () {
			el.classList.add("visible");
		}, delay);

		delay += l.text === "" ? 80 : 120 + Math.random() * 60;
	});

	setTimeout(function () {
		overlay.classList.add("fade-out");
		setTimeout(function () {
			overlay.style.display = "none";
		}, 700);
	}, delay + 400);
})();

// ===== ELEMENTOS =====
var windowWrapper = document.querySelector(".window-wrapper");
var desktopIcon = document.getElementById("desktop-icon");
var taskbarPort = document.getElementById("taskbar-portfolio");
var startMenuEl = document.getElementById("start-menu");
var windowState = "normal";

// ===== BOTÕES DA JANELA =====
document.getElementById("btn-close").addEventListener("click", closeWindow);
document.getElementById("btn-minimize").addEventListener("click", function () {
	if (windowState === "normal") minimizeWindow();
	else if (windowState === "minimized") restoreWindow();
});
document.getElementById("btn-maximize").addEventListener("click", function () {
	this.style.transform = "scale(0.95)";
	var s = this;
	setTimeout(function () {
		s.style.transform = "scale(1)";
	}, 100);
});

// ===== FUNÇÕES DE JANELA =====
function closeWindow() {
	windowWrapper.classList.add("hidden");
	taskbarPort.classList.add("hidden");
	// ícone do desktop fica sempre visível — não é necessário nenhuma alteração aqui
	windowState = "closed";
	closeStartMenu();
}

function minimizeWindow() {
	windowWrapper.classList.add("hidden");
	taskbarPort.classList.add("active");
	windowState = "minimized";
	closeStartMenu();
}

function restoreWindow() {
	windowWrapper.classList.remove("hidden");
	taskbarPort.classList.remove("active");
	windowState = "normal";
}

function openWindow() {
	windowWrapper.classList.remove("hidden");
	taskbarPort.classList.remove("hidden");
	taskbarPort.classList.remove("active");
	windowState = "normal";
}

function taskbarClick() {
	if (windowState === "minimized") restoreWindow();
	else if (windowState === "normal") minimizeWindow();
	else if (windowState === "closed") openWindow();
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
	window.location.href = "shutdown.html";
}

// ===== TROCA DE IDIOMA =====
document.querySelector(".button")?.addEventListener("click", toggleLang);

function toggleLang() {
	var page = window.location.pathname.split("/").pop();
	window.location.href =
		page === "indexEN.html" ? "index.html" : "indexEN.html";
}

// ===== DRAG (só desktop) =====
var isMobile = function () {
	return window.innerWidth <= 600;
};
var titleBar = document.querySelector(".title-bar");
var isDragging = false,
	currentX = 0,
	currentY = 0;
var initialX = 0,
	initialY = 0,
	xOffset = 0,
	yOffset = 0;

titleBar.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

titleBar.addEventListener(
	"touchstart",
	function (e) {
		if (!isMobile()) dragStart(e);
	},
	{ passive: false },
);
document.addEventListener(
	"touchmove",
	function (e) {
		if (!isMobile()) drag(e);
	},
	{ passive: false },
);
document.addEventListener("touchend", function () {
	if (!isMobile()) dragEnd();
});

function dragStart(e) {
	if (e.target.classList.contains("window-btn")) return;
	if (isMobile()) return;
	var cx = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
	var cy = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
	initialX = cx - xOffset;
	initialY = cy - yOffset;
	isDragging = true;
}

function drag(e) {
	if (!isDragging) return;
	e.preventDefault();
	var cx = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
	var cy = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
	currentX = cx - initialX;
	currentY = cy - initialY;
	xOffset = currentX;
	yOffset = currentY;
	windowWrapper.style.transform =
		"translate(" + currentX + "px, " + currentY + "px)";
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
	var h = String(now.getHours()).padStart(2, "0");
	var m = String(now.getMinutes()).padStart(2, "0");
	var el = document.getElementById("clock");
	if (el) el.textContent = h + ":" + m;
}
updateClock();
setInterval(updateClock, 1000);

// ===== TYPED CURSOR no terminal =====
(function () {
	var cursor = document.querySelector(".terminal-cursor");
	if (!cursor) return;
	// pisca via CSS
})();
